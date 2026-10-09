const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = /<h3 style=\{\{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#1f2937' \}\}>Route timeline \(\{plannedStops\.length\}\)/;
const replaceStr = `<h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#1f2937' }}>Stops Timeline ({plannedStops.length})`;

if (targetStr.test(code)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('Replaced successfully.');
} else {
  console.log('Target string not found!');
}
