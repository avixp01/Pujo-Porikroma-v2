const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "marginTop: '7px',",
  "marginTop: '10px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set gap to exactly 10px.');
