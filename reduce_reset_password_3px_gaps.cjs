const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Reduce top and bottom padding of reset_password view from 10px to 7px
code = code.replace(
  /\{view === 'reset_password' && \(\s*<div style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*padding:\s*'10px 0',\s*width:\s*'100%'\s*\}\}>/,
  "{view === 'reset_password' && (\n              <div style={{ display: 'flex', flexDirection: 'column', padding: '7px 0', width: '100%' }}>"
);

// 2. Reduce margin below text from 11px to 8px
code = code.replace(
  /margin:\s*'0\s+0\s+11px\s+0'\s*\}\}>\s*Enter your email or phone to reset your password easily.\s*<\/p>/,
  "margin: '0 0 8px 0'\n                    }}>\n                      Enter your email or phone to reset your password easily.\n                    </p>"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully reduced margins and padding by 3px in reset_password view.');
