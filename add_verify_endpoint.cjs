const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const verifyEndpoint = `
app.post('/api/auth/verify', (req, res) => {
  try {
    const { email, code } = req.body;
    
    if (!email || !code) {
      return res.status(400).json({ success: false, error: 'Email and code are required.' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, error: 'User is already verified.' });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ success: false, error: 'Invalid verification code.' });
    }

    if (new Date() > new Date(user.codeExpiresAt)) {
      return res.status(400).json({ success: false, error: 'Verification code has expired.' });
    }

    // Mark as verified
    user.isVerified = true;
    user.verificationCode = null;
    user.codeExpiresAt = null;
    saveUsers();

    return res.status(200).json({ 
      success: true, 
      message: 'Email verified successfully.',
      user: { firstname: user.firstname, lastname: user.lastname, email: user.email }
    });
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});
`;

if (!code.includes('/api/auth/verify')) {
  // Insert it right after the login endpoint
  const insertTarget = "app.post('/api/auth/login', (req, res) => {";
  const index = code.indexOf(insertTarget);
  if (index !== -1) {
    code = code.substring(0, index) + verifyEndpoint + "\n\n" + code.substring(index);
    fs.writeFileSync('server.js', code, 'utf8');
    console.log('Added /api/auth/verify endpoint.');
  } else {
    console.log('Could not find login endpoint to insert verify endpoint.');
  }
} else {
  console.log('Verify endpoint already exists.');
}
