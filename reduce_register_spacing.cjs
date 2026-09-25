const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Above "Register" title (margin: '3px 0 6px 0' -> '-3px 0 6px 0')
code = code.replace(
  /margin:\s*'3px 0 6px 0',\n\s*textAlign:\s*'center'\n\s*\}\}>Register<\/h2>/,
  `margin: '-3px 0 6px 0',\n                    textAlign: 'center'\n                  }}>Register</h2>`
);

// 2. Below "Signup now" text (marginBottom: '13px' -> '7px')
code = code.replace(
  /color:\s*'#8c7366',\s*fontSize:\s*'14px',\s*marginBottom:\s*'13px',\s*textAlign:\s*'center'\s*\}\}>\n\s*Signup now and get full access to our site\./,
  `color: '#8c7366', fontSize: '14px', marginBottom: '7px', textAlign: 'center' }}>
                    Signup now and get full access to our site.`
);

// 3. Below Gender block (marginBottom: '17px' -> '11px')
code = code.replace(
  /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*marginBottom:\s*'17px',\s*gap:\s*'16px'\s*\}\}>/,
  `<div style={{ display: 'flex', alignItems: 'center', marginBottom: '11px', gap: '16px' }}>`
);

// 4. Below "Already have an account" text (add marginBottom: '-6px')
code = code.replace(
  /<div style=\{\{\s*color:\s*'#8c7366',\s*fontSize:\s*'14px'\s*\}\}>\n\s*Already have an acount/,
  `<div style={{ color: '#8c7366', fontSize: '14px', marginBottom: '-6px' }}>\n                  Already have an acount`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Applied 6px reductions to the register view.');
