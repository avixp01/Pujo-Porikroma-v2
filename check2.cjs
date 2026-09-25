const fs = require('fs');
const code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');
const start = code.indexOf("marginBottom: '17px', position: 'relative'");
console.log(code.slice(start, start + 3000));
