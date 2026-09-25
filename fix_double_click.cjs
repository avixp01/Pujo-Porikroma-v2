const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldCheck = `if (data.success) {
            setView('verify_success');
          } else {
            setView('verify_error');
          }`;

const newCheck = `if (data.success || data.error === 'User is already verified.') {
            setView('verify_success');
          } else {
            setView('verify_error');
          }`;

if (code.includes(oldCheck)) {
  code = code.replace(oldCheck, newCheck);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Fixed double-click verification bug.');
} else {
  console.log('Could not find check block.');
}
