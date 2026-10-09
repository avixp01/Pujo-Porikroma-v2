const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetUseEffect = `  const [minimapRouteCoords, setMinimapRouteCoords] = useState(null);

  useEffect(() => {
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
          if (data.routes && data.routes.length > 0 && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
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

const targetPolyline = `                      {(plannedStops.length > 1 || (plannedStops.length > 0 && userLocation)) && (
                        <Polyline 
                          positions={minimapRouteCoords ? minimapRouteCoords : (userLocation ? [userLocation, ...plannedStops.map(s => [s.lat, s.lng])] : plannedStops.map(s => [s.lat, s.lng]))}
                          color={minimapRouteCoords ? "#3b82f6" : "#7c2d12"}
                          weight={minimapRouteCoords ? 5 : 3}
                          dashArray={minimapRouteCoords ? "none" : "5, 5"}
                          opacity={0.8}
                        />
                      )}`;

const replacePolyline = `                      {(plannedStops.length > 1 || (plannedStops.length > 0 && userLocation)) && (
                        <Polyline 
                          positions={userLocation ? [userLocation, ...plannedStops.map(s => [s.lat, s.lng])] : plannedStops.map(s => [s.lat, s.lng])}
                          color="#7c2d12"
                          weight={3}
                          dashArray="5, 5"
                          opacity={0.7}
                        />
                      )}`;

if (code.includes(targetUseEffect) && code.includes(targetPolyline)) {
  code = code.replace(targetUseEffect, '');
  code = code.replace(targetPolyline, replacePolyline);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('Reverted turn-by-turn navigation successfully.');
} else {
  console.log('Targets not found!');
  if (!code.includes(targetUseEffect)) console.log('targetUseEffect missing');
  if (!code.includes(targetPolyline)) console.log('targetPolyline missing');
}
