const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// Replace the 'from' name
code = code.replace(
  /from: '"from Pujo Porikroma" <' \+ smtpUser \+ '>',/,
  `from: '"Pujo Porikroma" <' + smtpUser + '>',`
);

// Add text fallback right before the html property
if (!code.includes("text: `Hello ${name}, your Pujo Porikroma verification code is: ${code}`,")) {
  code = code.replace(
    /subject: 'Your Pujo Porikroma Verification Code',/,
    `subject: 'Your Pujo Porikroma Verification Code',\n          text: \`Hello \${name}, your Pujo Porikroma verification code is: \${code}. Please do not share this code with anyone.\`,`
  );
}

fs.writeFileSync('server.js', code, 'utf8');
console.log('Optimized email for spam filters.');
