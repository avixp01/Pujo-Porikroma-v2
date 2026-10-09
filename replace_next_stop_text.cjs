const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = /<div style=\{\{ color: '#9ca3af', fontSize: '13px', textAlign: 'left' \}\}>Search pandals or add from map<\/div>/;
const replaceStr = `<div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'left' }}>Add more pandels from map</div>`;

if (targetStr.test(code)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('Replaced successfully.');
} else {
  console.log('Target string not found!');
}
