const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /style=\{\{\s*backgroundColor:\s*'#ffffff',/g,
  "style={{\n                  left: '-20px',\n                  right: '-20px',\n                  backgroundColor: '#ffffff',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Stretched dropdown by 20px with regex.');
