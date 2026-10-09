const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `dashArray={minimapRouteCoords ? "" : "5, 5"}`;
const replaceStr = `dashArray={minimapRouteCoords ? undefined : "5, 5"}`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done dashArray');
} else {
  console.log('not found');
}
