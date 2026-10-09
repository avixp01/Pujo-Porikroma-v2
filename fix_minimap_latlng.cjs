const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Fix MinimapController to use [s.lat, s.lng]
const regexController = /const MinimapController = \(\{ stops, userLocation \}\) => \{[\s\S]*?return routeCoords && routeCoords\.length > 0 \? <Polyline positions=\{routeCoords\} color="#7c2d12" weight=\{4\} dashArray="5, 10" opacity=\{0\.8\} \/> : null;\s*\};/g;

const newController = `const MinimapController = ({ stops, userLocation }) => {
  const map = useMap();
  const [routeCoords, setRouteCoords] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    if (stops && stops.length > 0) {
      const validStops = stops.filter(s => s && typeof s.lat === 'number' && typeof s.lng === 'number');
      if (validStops.length > 0) {
        const bounds = L.latLngBounds(validStops.map(s => [s.lat, s.lng]));
        if (userLocation && Array.isArray(userLocation) && userLocation.length >= 2) bounds.extend(userLocation);
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
        }
        
        const fetchMultiRoute = async () => {
           try {
             let coordsStr = '';
             if (userLocation && Array.isArray(userLocation) && userLocation.length >= 2) {
                coordsStr += \`\${userLocation[1]},\${userLocation[0]};\`;
             }
             coordsStr += validStops.map(s => \`\${s.lng},\${s.lat}\`).join(';');
             const res = await fetch(\`https://router.project-osrm.org/route/v1/foot/\${coordsStr}?overview=full&geometries=geojson\`);
             const data = await res.json();
             if (isMounted && data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
               const rawCoords = data.routes[0].geometry.coordinates;
               if (Array.isArray(rawCoords)) {
                   const parsed = rawCoords.map(c => {
                       if (Array.isArray(c) && c.length >= 2 && typeof c[0] === 'number' && typeof c[1] === 'number') {
                           return [c[1], c[0]];
                       }
                       return null;
                   }).filter(c => c !== null);
                   if (parsed.length > 0) setRouteCoords(parsed);
               }
             }
           } catch(e) {
             console.error("OSRM Multi-stop routing error:", e);
           }
        };
        fetchMultiRoute();
      } else {
        if (isMounted) setRouteCoords(null);
      }
    } else {
      if (isMounted) setRouteCoords(null);
    }
    return () => { isMounted = false; };
  }, [stops, userLocation, map]);

  return routeCoords && routeCoords.length > 0 ? <Polyline positions={routeCoords} color="#7c2d12" weight={4} dashArray="5, 10" opacity={0.8} /> : null;
};`;

if (regexController.test(content)) {
    content = content.replace(regexController, newController);
} else {
    console.log("MinimapController not found");
}

// Fix Minimap Marker mapping
const targetMarkerStr = `{plannedStops.filter(s => s && s.position && Array.isArray(s.position)).map((stop, idx) => (
                        <Marker 
                          key={idx}
                          position={stop.position}`;
const replacementMarkerStr = `{plannedStops.filter(s => s && typeof s.lat === 'number' && typeof s.lng === 'number').map((stop, idx) => (
                        <Marker 
                          key={idx}
                          position={[stop.lat, stop.lng]}`;

if (content.includes(targetMarkerStr)) {
    content = content.replace(targetMarkerStr, replacementMarkerStr);
} else {
    console.log("Target marker str not found");
}

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully fixed lat/lng mapping!");
