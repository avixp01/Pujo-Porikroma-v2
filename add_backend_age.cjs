const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const oldRegLogic = `    // Check global name uniqueness`;
const newRegLogic = `    // Check age restriction (must be 17+)
    if (dob) {
      const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      if (age < 17) {
        return res.status(400).json({ success: false, error: 'User must be at least 17 years old.' });
      }
    }

    // Check global name uniqueness`;

code = code.replace(oldRegLogic, newRegLogic);

fs.writeFileSync('server.js', code, 'utf8');
console.log('Backend age restriction added!');
