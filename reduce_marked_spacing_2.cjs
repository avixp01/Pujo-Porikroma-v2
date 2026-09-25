const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Reduce gap below Login h2 by 5px (11px -> 6px)
const searchH2 = `margin: '0 0 11px 0',`;
const replaceH2 = `margin: '0 0 6px 0',`;
code = code.replace(searchH2, replaceH2);

// 2. Reduce gap below Continue with Google button by 5px (16px -> 11px)
const searchGoogleBtn = `justifyContent: 'center',\n              cursor: 'pointer',\n              marginBottom: '16px'\n            }}>`;
const replaceGoogleBtn = `justifyContent: 'center',\n              cursor: 'pointer',\n              marginBottom: '11px'\n            }}>`;
code = code.replace(searchGoogleBtn, replaceGoogleBtn);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced spacing as marked by 5px');
