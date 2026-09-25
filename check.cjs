const fs = require('fs');
const code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');
const start = code.indexOf("view === 'reset_password'");
console.log(code.slice(start, start + 3000));
