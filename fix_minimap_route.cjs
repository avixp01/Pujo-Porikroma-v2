const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const stateInsertTarget = `const [routeData, setRouteData] = useState(null);`;
const stateInsertReplace = `const [routeData, setRouteData] = useState(null);
  const [minimapRouteCoords, setMinimapRouteCoords] = useState(null);

  React.useEffect(() => {
    if (plannedStops.length > 0) {
      const fetchMinimapRoute = async () => {
        let allPoints = [];
        if (userLocation) allPoints.push(userLocation);
        plannedStops.forEach(s => allPoints.push([s.lat, s.lng]));
        
        if (allPoints.length < 2) {
           setMinimapRouteCoords(null);
           return;
        }

        const coordString = allPoints.map(p => \`\${p[1]},\${p[0]}\`).join(';');
        const osrmUrl = \`https://router.project-osrm.org/route/v1/foot/\${coordString}?geometries=geojson&overview=full\`;
        
        try {
          const response = await fetch(osrmUrl);
          const data = await response.json();
          if (data.routes && data.routes.length > 0) {
            const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setMinimapRouteCoords(coordinates);
          }
        } catch (err) {
          console.error("Failed to fetch minimap route", err);
        }
      };
      
      // Debounce slightly to avoid spamming the API on rapid stop additions
      const timerId = setTimeout(fetchMinimapRoute, 300);
      return () => clearTimeout(timerId);
    } else {
      setMinimapRouteCoords(null);
    }
  }, [plannedStops, userLocation]);`;

const safeReplace = (targetStr, replaceStr, logName) => {
  const targetLF = targetStr.replace(/\r\n/g, '\n');
  const replaceLF = replaceStr.replace(/\r\n/g, '\n');
  if (code.includes(targetStr)) {
    code = code.replace(targetStr, replaceStr);
    console.log(logName + ' done CRLF');
  } else if (code.includes(targetLF)) {
    code = code.replace(targetLF, replaceLF);
    console.log(logName + ' done LF');
  } else {
    console.log(logName + ' not found');
  }
};

safeReplace(stateInsertTarget, stateInsertReplace, 'state');

const polylineTarget = `{(plannedStops.length > 1 || (plannedStops.length > 0 && userLocation)) && (
                      <Polyline 
                        positions={userLocation ? [userLocation, ...plannedStops.map(s => [s.lat, s.lng])] : plannedStops.map(s => [s.lat, s.lng])}
                        color="#7c2d12"
                        weight={3}
                        dashArray="5, 5"
                        opacity={0.7}
                      />
                    )}`;

const polylineReplace = `{(plannedStops.length > 1 || (plannedStops.length > 0 && userLocation)) && (
                      <Polyline 
                        positions={minimapRouteCoords ? minimapRouteCoords : (userLocation ? [userLocation, ...plannedStops.map(s => [s.lat, s.lng])] : plannedStops.map(s => [s.lat, s.lng]))}
                        color={minimapRouteCoords ? "#3b82f6" : "#7c2d12"}
                        weight={minimapRouteCoords ? 5 : 3}
                        dashArray={minimapRouteCoords ? "" : "5, 5"}
                        opacity={0.8}
                      />
                    )}`;

safeReplace(polylineTarget, polylineReplace, 'polyline');

fs.writeFileSync('src/components/MapPage.jsx', code);
