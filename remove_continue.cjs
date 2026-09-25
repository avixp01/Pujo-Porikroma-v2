const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Remove the Continue button from verify_success
const buttonPattern = /<button type="button" onClick=\{onLogin\} style=\{\{[^}]+\}\}>Continue<\/button>/;
if (buttonPattern.test(code)) {
  code = code.replace(buttonPattern, "");
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Removed Continue button from verify_success.');
} else {
  console.log('Could not find Continue button.');
}
