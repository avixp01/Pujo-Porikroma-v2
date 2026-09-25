const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "padding: '16px 0',",
  "padding: '16px 0 16px 3px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Added 3px left padding to the dropdown container to shift context right.');
