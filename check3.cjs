const fs = require('fs');
const code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');
const start = code.indexOf("view === 'verify_reset_code'");
console.log(code.slice(start, start + 3000));
