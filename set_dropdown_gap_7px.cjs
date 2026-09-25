const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-6px',",
  "left: '-9px',"
);

code = code.replace(
  "right: '-6px',",
  "right: '-9px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set width to exactly 7px gap on both sides.');
