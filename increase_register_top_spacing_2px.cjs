const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

code = code.replace(
  /margin:\s*'-4px 0 6px 0',\n\s*textAlign:\s*'center'\n\s*\}\}>Register<\/h2>/,
  `margin: '-2px 0 6px 0',\n                      textAlign: 'center'\n                    }}>Register</h2>`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Increased top spacing by 2px (margin -4px to -2px).');
