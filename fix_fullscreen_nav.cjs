const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `<div style={{ width: '100vw', height: '100dvh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>`;
const replaceStr = `<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999999, display: 'flex', flexDirection: 'column', backgroundColor: '#f9fafb' }}>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log("Fixed position successfully.");
} else {
  console.log("Target string not found!");
}
