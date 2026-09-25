const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace fontWeight: 'bold' with fontWeight: '600'
code = code.replace(/fontWeight:\s*'bold'/g, "fontWeight: '600'");

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully reduced font weight of item titles");
