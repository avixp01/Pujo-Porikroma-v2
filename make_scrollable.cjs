const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `<div className="route-timeline-list" style={{ position: 'relative' }}>`;
const replaceStr = `<div className="route-timeline-list" style={{ position: 'relative', maxHeight: '250px', overflowY: 'auto', paddingRight: '4px' }}>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done scrollable');
} else {
  console.log('not found');
}
