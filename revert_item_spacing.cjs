const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /paddingTop: '9px', paddingBottom: '9px'/g,
  "paddingTop: '11px', paddingBottom: '11px'"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reverted item spacing to 11px.');
