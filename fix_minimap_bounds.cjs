const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const oldBounds = `const MiniMapBounds = ({ stops }) => {
  const map = useMap();
  useEffect(() => {
    if (stops && stops.length > 0) {
      const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    }
  }, [stops, map]);
  return null;
};`;

const newBounds = `const MiniMapBounds = ({ stops, userLocation }) => {
  const map = useMap();
  useEffect(() => {
    let allPoints = [];
    if (userLocation) allPoints.push(userLocation);
    if (stops && stops.length > 0) {
      stops.forEach(s => allPoints.push([s.lat, s.lng]));
    }
    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    }
  }, [stops, map, userLocation]);
  return null;
};`;

if (code.includes(oldBounds)) {
    code = code.replace(oldBounds, newBounds);
    fs.writeFileSync('src/components/MapPage.jsx', code);
    console.log('updated minimap bounds CRLF');
} else {
    const oldBoundsLF = oldBounds.replace(/\r\n/g, '\n');
    const newBoundsLF = newBounds.replace(/\r\n/g, '\n');
    if (code.includes(oldBoundsLF)) {
        code = code.replace(oldBoundsLF, newBoundsLF);
        fs.writeFileSync('src/components/MapPage.jsx', code);
        console.log('updated minimap bounds LF');
    } else {
        console.log('not found minimap bounds');
    }
}
