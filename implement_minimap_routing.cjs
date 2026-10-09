const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexBounds = /const MinimapBounds = \(\{ stops \}\) => \{[\s\S]*?return null;\s*\};/g;

const minimapControllerCode = `const MinimapController = ({ stops, userLocation }) => {
  const map = useMap();
  const [routeCoords, setRouteCoords] = React.useState(null);

  React.useEffect(() => {
    if (stops && stops.length > 0) {
      const validStops = stops.filter(s => s && s.position);
      if (validStops.length > 0) {
        const bounds = L.latLngBounds(validStops.map(s => s.position));
        if (userLocation) bounds.extend(userLocation);
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
        }
        
        // Fetch OSRM walking route
        const fetchMultiRoute = async () => {
           try {
             let coordsStr = '';
             if (userLocation) {
                coordsStr += \`\${userLocation[1]},\${userLocation[0]};\`;
             }
             coordsStr += validStops.map(s => \`\${s.position[1]},\${s.position[0]}\`).join(';');
             const res = await fetch(\`https://router.project-osrm.org/route/v1/foot/\${coordsStr}?overview=full&geometries=geojson\`);
             const data = await res.json();
             if (data.routes && data.routes[0]) {
               const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
               setRouteCoords(coords);
             }
           } catch(e) {
             console.error("OSRM Multi-stop routing error:", e);
           }
        };
        fetchMultiRoute();
      } else {
        setRouteCoords(null);
      }
    } else {
      setRouteCoords(null);
    }
  }, [stops, userLocation, map]);

  return routeCoords ? <Polyline positions={routeCoords} color="#7c2d12" weight={4} dashArray="5, 10" opacity={0.8} /> : null;
};`;

if (regexBounds.test(content)) {
    content = content.replace(regexBounds, minimapControllerCode);
} else {
    console.log("MinimapBounds not found.");
}

const targetMinimapBoundsTag = `<MinimapBounds stops={plannedStops} />`;
if (content.includes(targetMinimapBoundsTag)) {
    content = content.replace(targetMinimapBoundsTag, `<MinimapController stops={plannedStops} userLocation={userLocation} />`);
}

const targetStaticPoly = /\{plannedStops\.length > 0 && <Polyline positions=\{[^}]+\} color="#7c2d12" weight=\{3\} opacity=\{0\.8\}(?: dashArray="5, 10")? \/>\}/g;
if (targetStaticPoly.test(content)) {
    content = content.replace(targetStaticPoly, '');
}

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully implemented OSRM MinimapController!");
