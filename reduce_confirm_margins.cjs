const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Above icon (marginTop: '10px' -> marginTop: '-3px')
let newCode = code.replace(
  /marginBottom:\s*'24px',\s*marginTop:\s*'10px',/,
  "marginBottom: '11px',\n                  marginTop: '-3px',"
);
if (newCode === code) console.log('Failed to replace icon margins');
code = newCode;

// 2. Below title (margin: '0 0 16px 0' -> margin: '0 0 3px 0')
newCode = code.replace(
  /margin:\s*'0 0 16px 0',\s*textAlign:\s*'center'\s*\}\}>Check your email<\/h2>/,
  "margin: '0 0 3px 0',\n                  textAlign: 'center'\n                }}>Check your email</h2>"
);
if (newCode === code) console.log('Failed to replace title margins');
code = newCode;

// 3. Below text (margin: '0 0 32px 0' -> margin: '0 0 19px 0')
newCode = code.replace(
  /margin:\s*'0 0 32px 0',\s*padding:\s*'0 10px'\s*\}\}>\s*Your unique code has been sent\. Please check your email now\./,
  "margin: '0 0 19px 0',\n                  padding: '0 10px'\n                }}>\n                  Your unique code has been sent. Please check your email now."
);
if (newCode === code) console.log('Failed to replace text margins');
code = newCode;

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced.');
