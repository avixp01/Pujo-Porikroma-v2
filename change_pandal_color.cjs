const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /case 'pandal':\s+return \{\s+color: '#ef4444',/g,
  "case 'pandal': \n          return { \n            color: '#b4860b',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Changed pandal theme color to dark yellow ochre (#b4860b).');
