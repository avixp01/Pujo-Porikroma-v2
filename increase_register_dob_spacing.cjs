const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

code = code.replace(
  /<div style=\{\{\s*marginBottom:\s*'14px'\s*\}\}>\n\s*<label style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'4px'\s*\}\}>Date of Birth<\/label>/,
  `<div style={{ marginBottom: '17px' }}>\n                    <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth</label>`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Increased spacing below Date of Birth by 3px (14px -> 17px).');
