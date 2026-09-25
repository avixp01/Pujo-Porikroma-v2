const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// The "Enter Code" buttons currently have:
// padding: '16px',
// fontSize: '18px',
// We want to change them to:
// padding: '12px',
// fontSize: '16px',

// 1. First Enter Code button (in confirm_email view)
let oldBlock1 = `padding: '16px',\n                  fontSize: '18px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code`;
let newBlock1 = `padding: '12px',\n                  fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code`;

code = code.replace(oldBlock1, newBlock1);

// 2. Second Enter Code button (in reset_password view)
let oldBlock2 = `padding: '16px',\n                  fontSize: '18px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  marginBottom: '16px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code`;
let newBlock2 = `padding: '12px',\n                  fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  marginBottom: '16px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code`;

code = code.replace(oldBlock2, newBlock2);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Resized Enter Code buttons to match Sign In button.');
