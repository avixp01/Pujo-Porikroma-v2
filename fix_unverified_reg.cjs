const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const oldLogic = `      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(409).json({ success: false, error: 'Email is already registered.' });
      }`;

const newLogic = `      const existingUserIndex = users.findIndex(u => u.email === email);
      if (existingUserIndex !== -1) {
        if (users[existingUserIndex].isVerified) {
          return res.status(409).json({ success: false, error: 'Email is already registered and verified. Please log in.' });
        } else {
          // If unverified, remove the old pending record so they can try again with a fresh code
          users.splice(existingUserIndex, 1);
        }
      }`;

if (code.includes(oldLogic)) {
  code = code.replace(oldLogic, newLogic);
  fs.writeFileSync('server.js', code, 'utf8');
  console.log('Successfully updated registration logic to allow re-registering for unverified accounts.');
} else {
  console.log('Could not find the target logic.');
}
