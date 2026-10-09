const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    }`;

const replaceStr = `if (allPoints.length === 1) {
      map.setView(allPoints[0], 15);
    } else if (allPoints.length > 1) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    }`;

const targetLF = targetStr.replace(/\r\n/g, '\n');
const replaceLF = replaceStr.replace(/\r\n/g, '\n');

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done MiniMapBounds safety');
} else if (code.includes(targetLF)) {
  code = code.replace(targetLF, replaceLF);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done MiniMapBounds safety LF');
} else {
  console.log('not found MiniMapBounds');
}
