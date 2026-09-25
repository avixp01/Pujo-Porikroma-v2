const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

code = code.replace(
  `subject: 'Your Pujo Porikroma Verification Code',`,
  "subject: `Your Pujo Porikroma Verification Code: ${code}`,"
);

fs.writeFileSync('server.js', code, 'utf8');
console.log('Updated email subject to include the code to prevent Gmail threading!');
