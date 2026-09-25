const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Normalize the indentation for the second Enter Code button
let oldBlock = `padding: '12px',\n                    fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  marginBottom: '16px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code`;

let newBlock = `padding: '12px',\n                  fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  marginBottom: '16px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Enter Code`;

code = code.replace(oldBlock, newBlock);
fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log("Fixed indentation for second Enter Code button.");
