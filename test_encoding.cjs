const fs = require('fs');

const corrupted = fs.readFileSync('src/components/MapPage.jsx', 'utf8');
const buffer = Buffer.from(corrupted, 'latin1');
const fixed = buffer.toString('utf8');

const idx = fixed.indexOf('map.zoomOut()');
console.log(fixed.substring(idx - 50, idx + 150));
