const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Title margin top
let newCode = code.replace(
  /margin:\s*'10px 0 6px 0',\s*textAlign:\s*'center'\s*\}\}>Register<\/h2>/,
  `margin: '0 0 6px 0',\n                  textAlign: 'center'\n                }}>Register</h2>`
);
if(newCode === code) console.log("Failed to replace title margin");
code = newCode;

// 2. Subtitle margin bottom
newCode = code.replace(
  /marginBottom:\s*'20px',\s*textAlign:\s*'center'\s*\}\}>\s*Signup now and get full access to our site\./,
  `marginBottom: '10px', textAlign: 'center' }}>\n                Signup now and get full access to our site.`
);
if(newCode === code) console.log("Failed to replace subtitle margin");
code = newCode;

// 3. Gender block margin bottom
newCode = code.replace(
  /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*marginBottom:\s*'24px',\s*gap:\s*'16px'\s*\}\}>\s*<span style=\{\{\s*color:\s*'#ffb366',\s*fontSize:\s*'14px',\s*fontWeight:\s*'500'\s*\}\}>Gender:<\/span>/,
  `<div style={{ display: 'flex', alignItems: 'center', marginBottom: '14px', gap: '16px' }}>\n                  <span style={{ color: '#ffb366', fontSize: '14px', fontWeight: '500' }}>Gender:</span>`
);
if(newCode === code) console.log("Failed to replace gender margin");
code = newCode;

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced.');
