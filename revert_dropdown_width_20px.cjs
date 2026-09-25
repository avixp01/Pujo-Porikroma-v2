const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-15px',",
  "left: '4px',"
);

code = code.replace(
  "right: '-15px',",
  "right: '4px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reverted width back to 20px gap on both sides.');
