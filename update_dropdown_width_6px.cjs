const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "width: 'calc(100vw - 2px)',",
  "width: 'calc(100vw - 12px)',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Updated width to leave 6px margin on both sides.');
