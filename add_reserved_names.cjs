const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const newEndpoint = `
app.get('/api/auth/reserved-names', (req, res) => {
  try {
    const reserved = new Set();
    users.forEach(u => {
      if (u.isVerified) {
        if (u.firstname) reserved.add(u.firstname.toLowerCase().trim());
        if (u.lastname) reserved.add(u.lastname.toLowerCase().trim());
      }
    });
    res.json({ success: true, reservedNames: Array.from(reserved) });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

app.post('/api/auth/register',`;

code = code.replace("app.post('/api/auth/register',", newEndpoint);

// Let's also add backend validation for registration to enforce the rule
const regLogic = `    const { firstname, lastname, email, password, dob, gender } = req.body;`;
const regValidation = `    const { firstname, lastname, email, password, dob, gender } = req.body;
    
    // Check global name uniqueness
    const fnLower = firstname ? firstname.toLowerCase().trim() : '';
    const lnLower = lastname ? lastname.toLowerCase().trim() : '';
    
    const isNameTaken = users.some(u => 
      u.isVerified && (
        (u.firstname && u.firstname.toLowerCase().trim() === fnLower) ||
        (u.lastname && u.lastname.toLowerCase().trim() === fnLower) ||
        (u.firstname && u.firstname.toLowerCase().trim() === lnLower) ||
        (u.lastname && u.lastname.toLowerCase().trim() === lnLower)
      )
    );

    if (isNameTaken) {
      return res.status(409).json({ success: false, error: 'Firstname or Lastname is already taken by another user.' });
    }
`;

code = code.replace(regLogic, regValidation);

fs.writeFileSync('server.js', code, 'utf8');
console.log('Added /api/auth/reserved-names and validation.');
