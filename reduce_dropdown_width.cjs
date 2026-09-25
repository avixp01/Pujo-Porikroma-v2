const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "width: 'calc(100vw - 1px)',",
  "width: 'calc(100vw - 2px)',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced width by 0.5px on both sides (total 1px gap).');
