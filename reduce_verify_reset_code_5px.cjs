const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Wrapper padding (3px 0 to 0)
code = code.replace(
  /\{view === 'verify_reset_code' && \(\s*<div style=\{\{\s*display:\s*'flex',\s*flexDirection:\s*'column',\s*padding:\s*'3px 0',\s*width:\s*'100%'\s*\}\}>/,
  "{view === 'verify_reset_code' && (\n              <div style={{ display: 'flex', flexDirection: 'column', padding: '0', width: '100%' }}>"
);

// 2. Title margin (0 0 5px 0 to -2px 0 0 0)
code = code.replace(
  /margin:\s*'0\s+0\s+5px\s+0',\s*textAlign:\s*'center'\s*\}\}>Verify Your Code<\/h2>/,
  "margin: '-2px 0 0 0',\n                  textAlign: 'center'\n                }}>Verify Your Code</h2>"
);

// 3. Text margin (0 0 13px 0 to 0 0 8px 0)
code = code.replace(
  /margin:\s*'0\s+0\s+13px\s+0'\s*\}\}>\s*Please enter the 5-digit verification code we sent to your registered email to proceed securely.\s*<\/p>/,
  "margin: '0 0 8px 0'\n                  }}>\n                    Please enter the 5-digit verification code we sent to your registered email to proceed securely.\n                  </p>"
);

// 4. Boxes margin (21px to 16px)
code = code.replace(
  /<div\s+style=\{\{\s*display:\s*'flex',\s*gap:\s*'8px',\s*justifyContent:\s*'center',\s*width:\s*'100%',\s*marginBottom:\s*'21px'\s*\}\}>/,
  "<div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '16px' }}>"
);

// 5. Bottom text margin (add marginBottom: '-2px')
code = code.replace(
  /<div\s+style=\{\{\s*color:\s*'#8c7366',\s*fontSize:\s*'14px',\s*textAlign:\s*'center'\s*\}\}>/,
  "<div style={{ color: '#8c7366', fontSize: '14px', textAlign: 'center', marginBottom: '-2px' }}>"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully reduced 5 gaps by 5px each in verify_reset_code view.');
