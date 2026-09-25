const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /paddingTop: '9px', paddingBottom: '9px'/g,
  "paddingTop: '7px', paddingBottom: '7px'"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced item spacing a little bit more to 7px.');
