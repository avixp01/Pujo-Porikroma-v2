const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchText = `Signup now and get full access to our app.`;
const replaceText = `Signup now and get full access to our site.`;

code = code.replace(searchText, replaceText);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced "app" with "site"');
