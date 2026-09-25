const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-63px',",
  "left: '-61px',"
);

code = code.replace(
  "width: 'calc(100vw - 10px)',",
  "width: 'calc(100vw - 14px)',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced width to leave exactly 7px gap on both sides.');
