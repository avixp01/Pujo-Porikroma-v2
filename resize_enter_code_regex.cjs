const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Replace both Enter Code buttons' padding and font size using regex
code = code.replace(
  /padding:\s*'16px',\s*fontSize:\s*'18px',/g,
  "padding: '12px',\n                  fontSize: '16px',"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Resized Enter Code buttons via regex.');
