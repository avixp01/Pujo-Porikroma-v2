const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Reduce Sign In button size
const searchSignIn = `                padding: '16px',\n                fontSize: '18px',\n                fontWeight: '600',`;
const replaceSignIn = `                padding: '12px',\n                fontSize: '16px',\n                fontWeight: '600',`;
code = code.replace(searchSignIn, replaceSignIn);

// 2. Reduce Continue with Google button size
const searchGoogle = `              padding: '14px',\n              fontSize: '16px',\n              fontWeight: '500',`;
const replaceGoogle = `              padding: '10px',\n              fontSize: '15px',\n              fontWeight: '500',`;
code = code.replace(searchGoogle, replaceGoogle);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced sizes of both buttons');
