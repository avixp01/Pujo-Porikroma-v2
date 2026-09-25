const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-62px',",
  "left: '-61.5px',"
);

code = code.replace(
  "width: 'calc(100vw - 12px)',",
  "width: 'calc(100vw - 13px)',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced width by 0.5px on both sides (total 6.5px gap).');
