const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

let newCode = code.replace(
  /\{view === 'verify_code' && \(\n\s*<div style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*alignItems:\s*'center',\s*padding:\s*'3px 0',\s*width:\s*'100%'\s*\}\}>/,
  `{view === 'verify_code' && (\n              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 0', width: '100%' }}>`
);

if (newCode === code) console.log('Failed to replace verify_code wrapper padding');
code = newCode;

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Adjusted padding to 6px (4px reduction from original).');
