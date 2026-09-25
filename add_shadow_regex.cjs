const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Replace using regex
const regex = /(width: '90%',\s*maxWidth: '400px',\s*background: 'linear-gradient\(135deg, #381f14, #1a0f0a\)',\s*borderRadius: '32px',\s*padding: '3px',[\s\S]*?position: 'relative')/g;

code = code.replace(regex, "$1,\n        boxShadow: '0 24px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 107, 0, 0.15)'");

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Added box-shadow to login card via regex');
