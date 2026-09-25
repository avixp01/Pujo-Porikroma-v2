const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /paddingTop: '8\.25px', paddingBottom: '8\.25px'/g,
  "paddingTop: '11px', paddingBottom: '11px'"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Updated spacing to 11px (+3px from base).');
