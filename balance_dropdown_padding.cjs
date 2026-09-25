const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "padding: '16px 0 16px 13px',",
  "padding: '16px 13px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set padding to 16px 13px to balance left and right gaps.');
