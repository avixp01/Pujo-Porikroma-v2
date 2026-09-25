const fs = require('fs');
const code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');
const start = code.indexOf("view === 'reset_error'");
console.log(code.slice(start, start + 1200));
