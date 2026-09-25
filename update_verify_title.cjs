const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldBlock = `<h2 style={{
                color: '#ffffff',
                fontSize: '22px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                textAlign: 'left'
              }}>Verify your account</h2>`;

const newBlock = `<h2 style={{
                color: '#ffffff',
                fontSize: '22px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                textAlign: 'center'
              }}>Verify Your Code</h2>`;

code = code.replace(oldBlock, newBlock);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced title text and centered it successfully.');
