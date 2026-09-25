const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "padding: '16px 0 16px 3px',",
  "padding: '16px 0 16px 10px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set inner left padding to 10px to shift context right.');
