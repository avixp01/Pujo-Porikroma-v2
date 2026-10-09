const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexMap = /\{plannedStops\.map\(\(stop, idx\) => \(\s*<Marker[\s\S]*?<\/Marker>\s*\)\)\}/g;
if (regexMap.test(content)) {
    // Only render markers for valid stops
    content = content.replace(regexMap, `{plannedStops.filter(s => s && s.position).map((stop, idx) => (
                        <Marker 
                          key={idx}
                          position={stop.position}
                          icon={L.divIcon({
                            className: 'custom-route-marker',
                            html: \`<div style="background-color: white; width: 24px; height: 24px; border-radius: 50%; color: #111827; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid \${idx === 0 ? '#10b981' : idx === plannedStops.length - 1 ? '#ef4444' : '#f59e0b'}; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">\${idx + 1}</div>\`,
                            iconSize: [24, 24],
                            iconAnchor: [12, 12]
                          })}
                        />
                      ))}`);
}

const regexController = /const MinimapController = \(\{ stops, userLocation \}\) => \{[\s\S]*?return routeCoords \? <Polyline positions=\{routeCoords\} color="#7c2d12" weight=\{4\} dashArray="5, 10" opacity=\{0\.8\} \/> : null;\s*\};/g;

const newController = `const MinimapController = ({ stops, userLocation }) => {
  const map = useMap();
  const [routeCoords, setRouteCoords] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    if (stops && stops.length > 0) {
      const validStops = stops.filter(s => s && s.position && Array.isArray(s.position) && s.position.length >= 2);
      if (validStops.length > 0) {
        const bounds = L.latLngBounds(validStops.map(s => s.position));
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
             coordsStr += validStops.map(s => \`\${s.position[1]},\${s.position[0]}\`).join(';');
             const res = await fetch(\`https://router.project-osrm.org/route/v1/foot/\${coordsStr}?overview=full&geometries=geojson\`);
             const data = await res.json();
             if (isMounted && data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
               // robust parsing for LineString
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
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully fortified MinimapController and Markers!");
} else {
    console.log("Regex failed for MinimapController");
}
