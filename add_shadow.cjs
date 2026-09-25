const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Replace the card wrapper to add box-shadow
const searchStr = `        borderRadius: '32px',\n        padding: '3px', // For the gradient border\n        position: 'relative'\n      }}>`;
const replaceStr = `        borderRadius: '32px',\n        padding: '3px', // For the gradient border\n        position: 'relative',\n        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(255, 107, 0, 0.15)'\n      }}>`;

code = code.replace(searchStr, replaceStr);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Added box-shadow to login card');
