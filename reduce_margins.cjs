const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Register title margin top
code = code.replace(
  "margin: '10px 0 6px 0',\\n                  textAlign: 'center'\\n                }}>Register</h2>",
  "margin: '5px 0 6px 0',\\n                  textAlign: 'center'\\n                }}>Register</h2>"
);

// 2. Subtitle margin bottom
code = code.replace(
  "<div style={{ color: '#8c7366', fontSize: '14px', marginBottom: '20px', textAlign: 'center' }}>\\n                  Signup now and get full access to our site.\\n                </div>",
  "<div style={{ color: '#8c7366', fontSize: '14px', marginBottom: '15px', textAlign: 'center' }}>\\n                  Signup now and get full access to our site.\\n                </div>"
);

// 3. Gender block margin bottom
code = code.replace(
  "<div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>\\n                  <span style={{ color: '#ffb366', fontSize: '14px', fontWeight: '500' }}>Gender:</span>",
  "<div style={{ display: 'flex', alignItems: 'center', marginBottom: '19px', gap: '16px' }}>\\n                  <span style={{ color: '#ffb366', fontSize: '14px', fontWeight: '500' }}>Gender:</span>"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced margins by 5px as requested.');
