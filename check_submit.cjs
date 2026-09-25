const fs = require('fs');
const code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');
const start = code.indexOf('const handleResetVerifySubmit');
console.log(code.slice(start, start + 800));
