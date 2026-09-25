const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchText = `Instructions to recover your password have been sent.`;
const replaceText = `Your unique code has been sent.`;

code = code.replace(searchText, replaceText);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced text successfully');
