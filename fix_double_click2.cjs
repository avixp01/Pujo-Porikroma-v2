const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

code = code.replace(
  `      if (data.success) {
          setView('verify_success');
        } else {
          setView('verify_error');
        }`,
  `      if (data.success || data.error === 'User is already verified.') {
          setView('verify_success');
        } else {
          setView('verify_error');
        }`
);
fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Fixed double-click verification bug for sure.');
