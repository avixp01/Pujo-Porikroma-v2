const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "marginTop: '15px',",
  "marginTop: '12px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set gap to exactly 12px.');
