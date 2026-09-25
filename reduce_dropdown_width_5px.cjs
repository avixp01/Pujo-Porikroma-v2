const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-61.5px',",
  "left: '-63px',"
);

code = code.replace(
  "width: 'calc(100vw - 13px)',",
  "width: 'calc(100vw - 10px)',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced width to leave exactly 5px gap on both sides.');
