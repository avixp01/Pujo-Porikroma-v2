const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldHandleRegister = `    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      if (isUnderage) {`;
      
const newHandleRegister = `    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      setCodeDigits(['', '', '', '', '']); // Clear the input boxes so user is forced to enter the NEW code
      if (isUnderage) {`;

code = code.replace(oldHandleRegister, newHandleRegister);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Clearing codeDigits on Resend Now!');
