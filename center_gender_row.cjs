const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. DOB marginBottom (17px -> 11px)
code = code.replace(
  /<div style=\{\{\s*marginBottom:\s*'17px'\s*\}\}>\n\s*<label style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'4px'\s*\}\}>Date of Birth<\/label>/,
  `<div style={{ marginBottom: '11px' }}>\n                    <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '4px' }}>Date of Birth</label>`
);

// 2. Gender marginBottom (4px -> 10px)
code = code.replace(
  /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*marginBottom:\s*'4px',\s*gap:\s*'16px'\s*\}\}>/,
  `<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '16px' }}>`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Centered Gender row by setting margins to 11px and 10px.');
