const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const oldReservedNames = `app.get('/api/auth/reserved-names', (req, res) => {
  try {
    const reserved = new Set();
    users.forEach(u => {
      if (u.isVerified) {
        if (u.firstname) reserved.add(u.firstname.toLowerCase().trim());
        if (u.lastname) reserved.add(u.lastname.toLowerCase().trim());
      }
    });
    res.json({ success: true, reservedNames: Array.from(reserved) });
  } catch (err) {`;

const newReservedNames = `app.get('/api/auth/reserved-names', (req, res) => {
  try {
    const reserved = new Set();
    const emails = new Set();
    users.forEach(u => {
      if (u.isVerified) {
        if (u.firstname) reserved.add(u.firstname.toLowerCase().trim());
        if (u.lastname) reserved.add(u.lastname.toLowerCase().trim());
        if (u.email) emails.add(u.email.toLowerCase().trim());
      }
    });
    res.json({ success: true, reservedNames: Array.from(reserved), reservedEmails: Array.from(emails) });
  } catch (err) {`;

if (code.includes(oldReservedNames)) {
  code = code.replace(oldReservedNames, newReservedNames);
  fs.writeFileSync('server.js', code, 'utf8');
  console.log('Added reservedEmails to backend!');
} else {
  console.log('Could not find reserved-names route.');
}
