const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Reduce title margin from 10px to 4px
code = code.replace(
  /margin:\s*'0\s+0\s+10px\s+0',\s*textAlign:\s*'center'\s*\}\}>Reset Your Password<\/h2>/,
  "margin: '0 0 4px 0',\n                  textAlign: 'center'\n                }}>Reset Your Password</h2>"
);

// 2. Reduce text margin from 19px to 13px
code = code.replace(
  /margin:\s*'0\s+0\s+19px\s+0'\s*\}\}>\s*Enter your email or phone to reset your password easily.\s*<\/p>/,
  "margin: '0 0 13px 0'\n                }}>\n                  Enter your email or phone to reset your password easily.\n                </p>"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully reduced Title and Text margins by 6px in reset_password view.');
