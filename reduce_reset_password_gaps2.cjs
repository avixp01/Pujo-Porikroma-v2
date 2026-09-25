const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// The replacement script failed because of line endings. Let's use robust regex.

// 1. Text below Title
code = code.replace(
  /margin:\s*'0\s+0\s+24px\s+0'/g,
  "margin: '0 0 19px 0'"
);

// 2. Email container
code = code.replace(
  /<div\s+style=\{\{\s*marginBottom:\s*'16px'\s*\}\}>\s*<label\s+style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'6px'\s*\}\}>Email<\/label>/,
  "<div style={{ marginBottom: '11px' }}>\n                  <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Email</label>"
);

// 3. Password container
code = code.replace(
  /<div\s+style=\{\{\s*marginBottom:\s*'16px',\s*position:\s*'relative'\s*\}\}>\s*<label\s+style=\{\{\s*display:\s*'flex',\s*color:\s*'#ffb366',\s*fontSize:\s*'13px',\s*fontWeight:\s*'500',\s*marginBottom:\s*'6px'\s*\}\}>Password<\/label>/,
  "<div style={{ marginBottom: '11px', position: 'relative' }}>\n                  <label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Password</label>"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully reduced margins by 5px in reset_password view.');
