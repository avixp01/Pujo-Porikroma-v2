const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchGoogleBtn = `justifyContent: 'center',\n              cursor: 'pointer',\n              marginBottom: '11px'\n            }}>`;
const replaceGoogleBtn = `justifyContent: 'center',\n              cursor: 'pointer',\n              marginBottom: '6px'\n            }}>`;
code = code.replace(searchGoogleBtn, replaceGoogleBtn);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced spacing below Google button by another 5px (to 6px)');
