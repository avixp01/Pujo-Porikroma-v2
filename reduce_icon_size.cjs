const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /width: "20px", height: "20px"/g,
  'width: "16px", height: "16px"'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reduced icon sizes to 16px.');
