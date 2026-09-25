const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Add state variable
code = code.replace(
  /const \[navigationDestination, setNavigationDestination\] = useState\(null\);/,
  `const [navigationDestination, setNavigationDestination] = useState(null);\n  const [isRouteSwapped, setIsRouteSwapped] = useState(false);`
);

// 2. Update fetchRouteData dependencies and logic
const targetFetchRouteData = `  React.useEffect(() => {
    if (isDirectionPopupOpen && navigationDestination && userLocation) {
      const fetchRouteData = async () => {
        setIsRoutingLoading(true);
        try {
          // Walking Route
          const osrmUrl = \`https://router.project-osrm.org/route/v1/foot/\${userLocation[1]},\${userLocation[0]};\${navigationDestination.lng},\${navigationDestination.lat}?steps=true&geometries=geojson&overview=full\`;`;

const replacementFetchRouteData = `  React.useEffect(() => {
    if (isDirectionPopupOpen && navigationDestination && userLocation) {
      const fetchRouteData = async () => {
        setIsRoutingLoading(true);
        try {
          const startLat = isRouteSwapped ? navigationDestination.lat : userLocation[0];
          const startLng = isRouteSwapped ? navigationDestination.lng : userLocation[1];
          const endLat = isRouteSwapped ? userLocation[0] : navigationDestination.lat;
          const endLng = isRouteSwapped ? userLocation[1] : navigationDestination.lng;
          
          // Walking Route
          const osrmUrl = \`https://router.project-osrm.org/route/v1/foot/\${startLng},\${startLat};\${endLng},\${endLat}?steps=true&geometries=geojson&overview=full\`;`;

code = code.replace(targetFetchRouteData, replacementFetchRouteData);
code = code.replace(
  /coordinates: \[userLocation, \[navigationDestination.lat, navigationDestination.lng\]\]/g,
  `coordinates: [[startLat, startLng], [endLat, endLng]]`
);
code = code.replace(
  /const distToUser = Math.sqrt\(Math.pow\(station.lat - userLocation\[0\], 2\) \+ Math.pow\(station.lng - userLocation\[1\], 2\)\);/g,
  `const distToUser = Math.sqrt(Math.pow(station.lat - startLat, 2) + Math.pow(station.lng - startLng, 2));`
);
code = code.replace(
  /const distToDest = Math.sqrt\(Math.pow\(station.lat - navigationDestination.lat, 2\) \+ Math.pow\(station.lng - navigationDestination.lng, 2\)\);/g,
  `const distToDest = Math.sqrt(Math.pow(station.lat - endLat, 2) + Math.pow(station.lng - endLng, 2));`
);
code = code.replace(
  /}, \[isDirectionPopupOpen, navigationDestination, userLocation\]\);/g,
  `}, [isDirectionPopupOpen, navigationDestination, userLocation, isRouteSwapped]);`
);

// 3. Replace Polylines inside MapContainer
code = code.replace(
  /positions=\{\[userLocation, \[transitRouteData.originStation.lat, transitRouteData.originStation.lng\]\]\}/g,
  `positions={[[isRouteSwapped ? navigationDestination.lat : userLocation[0], isRouteSwapped ? navigationDestination.lng : userLocation[1]], [transitRouteData.originStation.lat, transitRouteData.originStation.lng]]}`
);
code = code.replace(
  /positions=\{\[\[transitRouteData.destStation.lat, transitRouteData.destStation.lng\], \[navigationDestination.lat, navigationDestination.lng\]\]\}/g,
  `positions={[[transitRouteData.destStation.lat, transitRouteData.destStation.lng], [isRouteSwapped ? userLocation[0] : navigationDestination.lat, isRouteSwapped ? userLocation[1] : navigationDestination.lng]]}`
);
code = code.replace(
  /positions=\{\[userLocation, \[metroRouteData.originStation.lat, metroRouteData.originStation.lng\]\]\}/g,
  `positions={[[isRouteSwapped ? navigationDestination.lat : userLocation[0], isRouteSwapped ? navigationDestination.lng : userLocation[1]], [metroRouteData.originStation.lat, metroRouteData.originStation.lng]]}`
);
code = code.replace(
  /positions=\{\[\[metroRouteData.destStation.lat, metroRouteData.destStation.lng\], \[navigationDestination.lat, navigationDestination.lng\]\]\}/g,
  `positions={[[metroRouteData.destStation.lat, metroRouteData.destStation.lng], [isRouteSwapped ? userLocation[0] : navigationDestination.lat, isRouteSwapped ? userLocation[1] : navigationDestination.lng]]}`
);


// 4. Update Inputs and Swap Button
code = code.replace(
  /<input type="text" className="direction-input" placeholder="Your location" defaultValue="Your location" \/>/,
  `<input type="text" className="direction-input" placeholder="Origin" value={isRouteSwapped ? (navigationDestination ? navigationDestination.name : '') : "Your location"} readOnly />`
);
code = code.replace(
  /<input type="text" className="direction-input" placeholder="Choose destination" value=\{navigationDestination \? navigationDestination.name : ''\} readOnly=\{!!navigationDestination\} \/>/,
  `<input type="text" className="direction-input" placeholder="Destination" value={isRouteSwapped ? "Your location" : (navigationDestination ? navigationDestination.name : '')} readOnly />`
);
code = code.replace(
  /<button className="direction-swap-btn">/,
  `<button className="direction-swap-btn" onClick={() => {
    setIsRouteSwapped(prev => !prev);
    if (navigationDestination && userLocation) {
      setMapCenter(isRouteSwapped ? [userLocation[0], userLocation[1]] : [navigationDestination.lat, navigationDestination.lng]);
    }
  }}>`
);

// 5. Update Step item texts for swapped state
// Find: <div className="step-content border-b">{navigationDestination.name}</div>
// and change to isRouteSwapped ? ...
code = code.replace(
  /<div className="step-content border-b">\{navigationDestination\.name\}<\/div>/g,
  `<div className="step-content border-b">{isRouteSwapped ? "Your location" : navigationDestination.name}</div>`
);
code = code.replace(
  /<div className="step-content border-b">Your location<\/div>/g,
  `<div className="step-content border-b">{isRouteSwapped ? navigationDestination.name : "Your location"}</div>`
);
code = code.replace(
  /<div className="step-title">Your location<\/div>/g,
  `<div className="step-title">{isRouteSwapped ? navigationDestination.name : "Your location"}</div>`
);
code = code.replace(
  /<div className="step-content">\{navigationDestination\.name\}<\/div>/g,
  `<div className="step-content">{isRouteSwapped ? "Your location" : navigationDestination.name}</div>`
);


fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated MapPage.jsx to support swapping routes.");
