const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

let newCode = code.replace(
  /margin:\s*'-2px 0 0 0',\n\s*textAlign:\s*'center'\n\s*\}\}>Verify your account<\/h2>/,
  `margin: '-1px 0 0 0',\n                  textAlign: 'center'\n                }}>Verify your account</h2>`
);

if (newCode === code) {
  console.log('Failed to replace title margin.');
} else {
  code = newCode;
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Adjusted title top margin to -1px.');
}
