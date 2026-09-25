const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "width: 'calc(100% - 8px)',",
  "width: 'calc(100% - 3px)',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Updated width to leave 1.5px margin on both sides.');
