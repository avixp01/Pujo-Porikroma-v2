const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /placeholder="Origin"/g,
  'placeholder="Current Location"'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Replaced Origin placeholder with Current Location.');
