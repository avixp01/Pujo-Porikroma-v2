const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target1 = `<div className="routes-view-container">`;
const replace1 = `<div className="routes-view-container" style={{ height: '100vh', overflow: 'hidden' }}>`;

if (code.includes(target1)) {
  code = code.replace(target1, replace1);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done constraint');
} else {
  console.log('not found');
}
