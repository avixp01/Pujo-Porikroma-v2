const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

code = code.replace(
  /<div style=\{\{\s*color:\s*'#8c7366',\s*fontSize:\s*'14px',\s*marginBottom:\s*'-4px'\s*\}\}>\n\s*Already have an acount/,
  `<div style={{ color: '#8c7366', fontSize: '14px', marginBottom: '-1px' }}>\n                  Already have an acount`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Increased bottom spacing by 3px (margin -4px to -1px).');
