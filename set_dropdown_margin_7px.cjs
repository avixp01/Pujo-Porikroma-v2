const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "marginTop: '5px',",
  "marginTop: '7px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set gap to exactly 7px.');
