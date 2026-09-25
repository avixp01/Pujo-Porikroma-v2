const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "padding: '8px 20px 8px 4px'",
  "padding: '8px 20px 8px 1px'"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Changed Matches Nearby left padding to 1px.');
