const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `height: '100vh', overflow: 'hidden'`;
const replaceStr = `height: '100dvh', overflow: 'hidden'`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done dvh');
} else {
  console.log('not found');
}
