const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(/\[\[renderStartLat, renderStartLng\]\]/g, '[[renderStartLat, renderStartLng]');
code = code.replace(/\[\[renderEndLat, renderEndLng\]\]/g, '[renderEndLat, renderEndLng]]');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed array bracket syntax error in Polyline.');
