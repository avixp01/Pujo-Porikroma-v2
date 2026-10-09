const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `if (data.routes && data.routes.length > 0) {
            const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);`;
const replaceStr = `if (data.routes && data.routes.length > 0 && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
            const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);`;

const targetLF = targetStr.replace(/\r\n/g, '\n');
const replaceLF = replaceStr.replace(/\r\n/g, '\n');

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done safety check');
} else if (code.includes(targetLF)) {
  code = code.replace(targetLF, replaceLF);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done safety check LF');
} else {
  console.log('not found safety');
}
