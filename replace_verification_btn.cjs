const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// We want to replace the Verification button in the reset_password view.
// It's followed by: <div style={{ color: '#8c7366', fontSize: '14px', textAlign: 'center' }}>
const oldBlock = `Verification
              </button>

              <div style={{ color: '#8c7366', fontSize: '14px', textAlign: 'center' }}>`;

const newBlock = `Enter Code
              </button>

              <div style={{ color: '#8c7366', fontSize: '14px', textAlign: 'center' }}>`;

code = code.replace(oldBlock, newBlock);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced Verification button text successfully.');
