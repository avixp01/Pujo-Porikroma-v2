const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Title margin bottom (from 16px to 6px)
let newCode = code.replace(
  /margin:\s*'0 0 16px 0',\s*textAlign:\s*'center'\s*\}\}>Verify your account<\/h2>/,
  `margin: '0 0 6px 0',\n                  textAlign: 'center'\n                }}>Verify your account</h2>`
);
if (newCode === code) console.log('Failed to replace title margin');
code = newCode;

// 2. Subtitle margin bottom (from 17px to 7px)
newCode = code.replace(
  /margin:\s*'0 0 17px 0',\s*padding:\s*'0 10px'\s*\}\}>\s*Please enter the 5-digit verification code we sent to your registered email to proceed securely\./,
  `margin: '0 0 7px 0',\n                  padding: '0 10px'\n                }}>\n                  Please enter the 5-digit verification code we sent to your registered email to proceed securely.`
);
if (newCode === code) console.log('Failed to replace subtitle margin');
code = newCode;

// 3. Input wrapper margin bottom (from 25px to 15px)
newCode = code.replace(
  /<div style=\{\{\s*display:\s*'flex',\s*gap:\s*'8px',\s*justifyContent:\s*'center',\s*width:\s*'100%',\s*marginBottom:\s*'25px'\s*\}\}>/,
  `<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '15px' }}>`
);
if (newCode === code) console.log('Failed to replace input wrapper margin');
code = newCode;

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced margins by 10px as requested.');
