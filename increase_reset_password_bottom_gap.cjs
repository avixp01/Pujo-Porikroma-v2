const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Increase margin above submit button from 10px to 15px
code = code.replace(
  /<div\s+style=\{\{\s*marginBottom:\s*'10px',\s*position:\s*'relative'\s*\}\}>\s*<label\s+style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'6px'\s*\}\}>Confirm Password<\/label>/,
  "<div style={{ marginBottom: '15px', position: 'relative' }}>\n                  <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Confirm Password</label>"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully increased Confirm Password margin by 5px in reset_password view.');
