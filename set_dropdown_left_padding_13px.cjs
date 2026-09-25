const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "padding: '16px 0 16px 17px',",
  "padding: '16px 0 16px 13px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set inner left padding to 13px to shift context right.');
