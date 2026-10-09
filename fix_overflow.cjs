const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const t1 = `<div className="routes-active-itinerary" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>`;
const r1 = `<div className="routes-active-itinerary" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>`;

if (code.includes(t1)) {
  code = code.replace(t1, r1);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done overflow hidden');
} else {
  console.log('not found');
}
