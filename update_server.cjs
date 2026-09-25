const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// The original line:
// return res.status(200).json({ success: true, message: 'Login successful.', user: { firstname: user.firstname, lastname: user.lastname, email: user.email } });
const targetStr = "return res.status(200).json({ success: true, message: 'Login successful.', user: { firstname: user.firstname, lastname: user.lastname, email: user.email } });";
const replacementStr = "return res.status(200).json({ success: true, message: 'Login successful.', user: { firstname: user.firstname, lastname: user.lastname, email: user.email, gender: user.gender } });";

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('server.js', code, 'utf8');
  console.log("Updated server.js to return gender");
} else {
  console.log("Target string not found in server.js");
}
