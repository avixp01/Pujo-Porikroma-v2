const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1 & 4. Parent wrapper padding (from 10px 0 to 3px 0)
let newCode = code.replace(
  /\{view === 'verify_code' && \(\n\s*<div style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*alignItems:\s*'center',\s*padding:\s*'10px 0',\s*width:\s*'100%'\s*\}\}>/,
  `{view === 'verify_code' && (\n              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3px 0', width: '100%' }}>`
);
if (newCode === code) console.log('Failed to replace verify_code wrapper padding');
code = newCode;

// 2. Subtitle margin bottom (from 24px to 17px)
// We need to match the specific subtitle in the verify_code view
newCode = code.replace(
  /margin:\s*'0 0 24px 0',\n\s*padding:\s*'0 10px'\n\s*\}\}>\n\s*Please enter the 5-digit verification code we sent to your registered email to proceed securely\./,
  `margin: '0 0 17px 0',\n                  padding: '0 10px'\n                }}>\n                  Please enter the 5-digit verification code we sent to your registered email to proceed securely.`
);
if (newCode === code) console.log('Failed to replace subtitle margin');
code = newCode;

// 3. Input wrapper margin bottom (from 32px to 25px)
newCode = code.replace(
  /<div style=\{\{\s*display:\s*'flex',\s*gap:\s*'8px',\s*justifyContent:\s*'center',\s*width:\s*'100%',\s*marginBottom:\s*'32px'\s*\}\}>/,
  `<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '25px' }}>`
);
if (newCode === code) console.log('Failed to replace input wrapper margin');
code = newCode;

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced margins by 7px as requested.');
