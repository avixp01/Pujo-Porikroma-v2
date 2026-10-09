const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `position: 'relative', flex: 1, overflowY: 'auto'`;
const replaceStr = `position: 'relative', height: 'calc(100dvh - 490px)', overflowY: 'auto'`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done height');
} else {
  console.log('not found');
}
