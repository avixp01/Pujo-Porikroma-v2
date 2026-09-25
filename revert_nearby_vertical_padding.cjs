const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "padding: '5px 20px 5px 1px'",
  "padding: '8px 20px 8px 1px'"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reverted Matches Nearby vertical padding to 8px.');
