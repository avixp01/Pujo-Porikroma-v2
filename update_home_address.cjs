const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Add state variable and ref
const stateTargetStr = `    const [userLocation, setUserLocation] = useState(null);`;
const stateReplacementStr = `    const [userLocation, setUserLocation] = useState(null);
    const [homeAddress, setHomeAddress] = useState('...');
    const lastFetchedLocationRef = React.useRef(null);`;

if (!mapPageCode.includes("const [homeAddress, setHomeAddress]")) {
  mapPageCode = mapPageCode.replace(stateTargetStr, stateReplacementStr);
}

// 2. Add useEffect for reverse geocoding
const useEffectTargetStr = `  const getDistance = (lat1, lon1, lat2, lon2) => {`;
const useEffectReplacementStr = `  React.useEffect(() => {
    if (!userLocation) {
      setHomeAddress('...');
      lastFetchedLocationRef.current = null;
      return;
    }
    
    // Fetch if haven't fetched yet, or if moved > ~1km (0.01 deg) to avoid spamming OSM API
    const movedSignificantly = !lastFetchedLocationRef.current || 
      Math.abs(lastFetchedLocationRef.current[0] - userLocation[0]) > 0.01 || 
      Math.abs(lastFetchedLocationRef.current[1] - userLocation[1]) > 0.01;
      
    if (movedSignificantly) {
      lastFetchedLocationRef.current = userLocation;
      const fetchAddress = async () => {
        try {
          const response = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${userLocation[0]}&lon=\${userLocation[1]}\`);
          const data = await response.json();
          if (data && data.display_name) {
            const parts = data.display_name.split(',').slice(0, 3).map(p => p.trim());
            setHomeAddress(parts.join(', '));
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchAddress();
    }
  }, [userLocation]);

  const getDistance = (lat1, lon1, lat2, lon2) => {`;

if (!mapPageCode.includes("nominatim.openstreetmap.org")) {
  mapPageCode = mapPageCode.replace(useEffectTargetStr, useEffectReplacementStr);
}


// 3. Replace hardcoded text
const textTargetStr = `<div className="item-subtitle">Ichapur, Kolkata, West Bengal</div>`;
const textReplacementStr = `<div className="item-subtitle">{homeAddress}</div>`;

if (mapPageCode.includes(textTargetStr)) {
  mapPageCode = mapPageCode.replace(textTargetStr, textReplacementStr);
}

fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
console.log('Successfully updated MapPage.jsx for dynamic home address.');
