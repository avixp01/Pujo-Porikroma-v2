const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "left: '-61px',",
  "left: '-58px',"
);

code = code.replace(
  "width: 'calc(100vw - 14px)',",
  "width: 'calc(100vw - 20px)',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced width to leave exactly 10px gap on both sides.');
