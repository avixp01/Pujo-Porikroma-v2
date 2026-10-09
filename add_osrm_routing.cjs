const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexState = /const \[plannedStops, setPlannedStops\] = useState\(\[\]\); \/\/ multi-select filter/g;
const replacementState = `const [plannedStops, setPlannedStops] = useState([]); // multi-select filter
  const [plannedRouteCoords, setPlannedRouteCoords] = useState([]);
  
  useEffect(() => {
    if (plannedStops.length < 2) {
      setPlannedRouteCoords([]);
      return;
    }
    const fetchPlannedRoute = async () => {
      try {
        const coordString = plannedStops.map(s => \`\${s.lng},\${s.lat}\`).join(';');
        const osrmUrl = \`https://router.project-osrm.org/route/v1/foot/\${coordString}?geometries=geojson&overview=full\`;
        const response = await fetch(osrmUrl);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
          setPlannedRouteCoords(coordinates);
        }
      } catch (e) {
        console.error("Failed to fetch planned route", e);
      }
    };
    fetchPlannedRoute();
  }, [plannedStops]);`;

if (regexState.test(content)) {
    content = content.replace(regexState, replacementState);
    console.log("Added state and useEffect for OSRM routing!");
}

const regexPolyline = /\{plannedStops\.length > 0 && <Polyline positions=\{plannedStops\.map\(s => \[s\.lat, s\.lng\]\)\} color="#7c2d12" weight=\{3\} opacity=\{0\.8\} \/>\}/g;
const replacementPolyline = `{plannedStops.length > 0 && <Polyline positions={plannedRouteCoords.length > 0 ? plannedRouteCoords : plannedStops.map(s => [s.lat, s.lng])} color="#7c2d12" weight={3} opacity={0.8} />}`;

if (regexPolyline.test(content)) {
    content = content.replace(regexPolyline, replacementPolyline);
    console.log("Updated Polyline rendering logic!");
}

fs.writeFileSync(file, content, 'utf8');
