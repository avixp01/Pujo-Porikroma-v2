const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

let newCode = code.replace(
  /\{view === 'verify_code' && \(\n\s*<div style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*alignItems:\s*'center',\s*padding:\s*'4px 0',\s*width:\s*'100%'\s*\}\}>/,
  `{view === 'verify_code' && (\n              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', width: '100%' }}>`
);

if (newCode === code) {
  console.log('Failed to replace verify_code wrapper padding (4px 0 not found).');
  // Check if it's already 0 or something else
  if (code.includes(`padding: '0'`)) {
    console.log('Padding is already 0');
  }
} else {
  code = newCode;
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Adjusted padding to 0 (reduced by another 4px).');
}
