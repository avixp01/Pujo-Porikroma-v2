const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Reduce top padding of reset_password view from 3px to 0
code = code.replace(
  /\{view === 'reset_password' && \(\s*<div style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*padding:\s*'3px 0',\s*width:\s*'100%'\s*\}\}>/,
  "{view === 'reset_password' && (\n              <div style={{ display: 'flex', flexDirection: 'column', padding: '0 0 3px 0', width: '100%' }}>"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully reduced top padding by 3px in reset_password view.');
