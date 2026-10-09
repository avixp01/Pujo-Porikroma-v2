const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const boundsComponentTarget = /const MiniMapBounds = \(\{ stops, userLocation \}\) => \{[\s\S]*?return null;\s*\};/;
const boundsComponentReplace = `const MiniMapBounds = ({ stops }) => {
  const map = useMap();
  React.useEffect(() => {
    if (stops && stops.length > 0) {
      const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    }
  }, [stops, map]);
  return null;
};`;

const boundsTagTarget = /<MiniMapBounds stops=\{plannedStops\} userLocation=\{userLocation\} \/>/;
const boundsTagReplace = `<MiniMapBounds stops={plannedStops} />`;

let replaced = false;
if (boundsComponentTarget.test(code)) {
  code = code.replace(boundsComponentTarget, boundsComponentReplace);
  replaced = true;
}
if (boundsTagTarget.test(code)) {
  code = code.replace(boundsTagTarget, boundsTagReplace);
  replaced = true;
}

if (replaced) {
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('Reverted MiniMapBounds successfully.');
} else {
  console.log('MiniMapBounds not found.');
}
