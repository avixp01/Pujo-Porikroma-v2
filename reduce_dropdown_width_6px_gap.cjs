const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-6px',",
  "left: '-10px',"
);

code = code.replace(
  "right: '-6px',",
  "right: '-10px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced width to leave exactly 6px gap on both sides.');
