const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-10px',",
  "left: '-6px',"
);

code = code.replace(
  "right: '-10px',",
  "right: '-6px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reverted width to 10px gap on both sides.');
