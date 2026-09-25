const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "width: 'calc(100% - 1px)',",
  "width: 'calc(100vw - 1px)',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Updated width to 100vw to break out of container padding.');
