const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '4px',",
  "left: '-15px',"
);

code = code.replace(
  "right: '4px',",
  "right: '-15px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Stretched width to leave exactly 1px gap on both sides.');
