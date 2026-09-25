const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const resetEndpoints = `
app.post('/api/auth/reset-request', (req, res) => {
  try {
    const { email } = req.body;
    const user = users.find(u => u.email === email && u.isVerified);
    if (!user) {
      return res.status(404).json({ success: false, error: 'Email not found.' });
    }

    const code = Math.floor(10000 + Math.random() * 90000).toString();
    user.resetCode = code;
    saveUsers();

    console.log('=========================================');
    console.log('[GENERATED PASSWORD RESET CODE] ' + code);
    console.log('[TARGET EMAIL] ' + email);
    console.log('=========================================');

    sendVerificationEmail(email, user.firstname, code);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

app.post('/api/auth/reset-password', (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    const user = users.find(u => u.email === email && u.isVerified);
    
    if (!user || user.resetCode !== code) {
      return res.status(400).json({ success: false, error: 'Incorrect code' });
    }

    user.password = hashPassword(newPassword);
    delete user.resetCode;
    saveUsers();
    
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});
`;

if (!code.includes('/api/auth/reset-request')) {
  code = code.replace(`app.post('/api/auth/login'`, resetEndpoints + `\napp.post('/api/auth/login'`);
  fs.writeFileSync('server.js', code, 'utf8');
  console.log('Added reset endpoints to server.js');
}
