const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const minimapBoundsCode = `
const MinimapBounds = ({ stops }) => {
  const map = useMap();
  React.useEffect(() => {
    if (stops && stops.length > 0) {
      const bounds = L.latLngBounds(stops.map(s => s.position));
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    }
  }, [stops, map]);
  return null;
};
`;

if (!content.includes('const MinimapBounds =')) {
    content = content.replace('const MapPage = ({ onClose }) => {', minimapBoundsCode + '\nconst MapPage = ({ onClose }) => {');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully injected MinimapBounds component!");
} else {
    console.log("MinimapBounds already exists.");
}
