const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace very light border with a slightly darker, clearly visible one.
code = code.replace(
  /borderBottom: '1px solid #f9fafb'/g,
  "borderBottom: '1px solid #e5e7eb'"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Made horizontal line visible in dropdown context items.');
