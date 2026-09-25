const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Reduce text margin from 13px to 11px
code = code.replace(
  /margin:\s*'0\s+0\s+13px\s+0'\s*\}\}>\s*Enter your email or phone to reset your password easily.\s*<\/p>/,
  "margin: '0 0 11px 0'\n                  }}>\n                    Enter your email or phone to reset your password easily.\n                  </p>"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully reduced Text margin by 2px in reset_password view.');
