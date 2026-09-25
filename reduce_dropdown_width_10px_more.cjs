const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-6px',",
  "left: '4px',"
);

code = code.replace(
  "right: '-6px',",
  "right: '4px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced width by another 10px (total 20px gap on both sides).');
