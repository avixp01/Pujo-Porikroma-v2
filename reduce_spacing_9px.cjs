const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /paddingTop: '11px', paddingBottom: '11px'/g,
  "paddingTop: '9px', paddingBottom: '9px'"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced item spacing a little bit to 9px.');
