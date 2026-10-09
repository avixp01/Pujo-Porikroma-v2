const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `minHeight: '100px', paddingBottom: '160px'`;
const replaceStr = `minHeight: '100px', paddingBottom: '80px'`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done padding');
} else {
  console.log('not found');
}
