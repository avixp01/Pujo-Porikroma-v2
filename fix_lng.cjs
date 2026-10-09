const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const t1 = `const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lon]));`;
const r1 = `const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lng]));`;

const t2 = `center={plannedStops.length > 0 ? [plannedStops[0].lat, plannedStops[0].lon] : [22.5726, 88.3639]}`;
const r2 = `center={plannedStops.length > 0 ? [plannedStops[0].lat, plannedStops[0].lng] : [22.5726, 88.3639]}`;

const t3 = `position={[stop.lat, stop.lon]}`;
const r3 = `position={[stop.lat, stop.lng]}`;

const t4 = `positions={plannedStops.map(s => [s.lat, s.lon])}`;
const r4 = `positions={plannedStops.map(s => [s.lat, s.lng])}`;

code = code.replace(t1, r1);
code = code.replace(t2, r2);
code = code.replace(t3, r3);
code = code.replace(t4, r4);

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done fixing lng');
