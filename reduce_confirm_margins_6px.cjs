const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Below icon (marginBottom: '11px' -> marginBottom: '5px')
let newCode = code.replace(
  /marginBottom:\s*'11px',\s*marginTop:\s*'-3px',/,
  "marginBottom: '5px',\n                  marginTop: '-3px',"
);
if (newCode === code) console.log('Failed to replace icon margin');
code = newCode;

// 2. Below text (margin: '0 0 19px 0' -> margin: '0 0 13px 0')
newCode = code.replace(
  /margin:\s*'0 0 19px 0',\s*padding:\s*'0 10px'\s*\}\}>\s*Your unique code has been sent\. Please check your email now\./,
  "margin: '0 0 13px 0',\n                  padding: '0 10px'\n                }}>\n                  Your unique code has been sent. Please check your email now."
);
if (newCode === code) console.log('Failed to replace text margin');
code = newCode;

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced margins by 6px as requested.');
