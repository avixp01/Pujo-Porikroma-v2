const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const oldVerify = `  app.post('/api/auth/verify', (req, res) => {
    try {
      const { email, code } = req.body;
      
      if (!email || !code) {`;

const newVerify = `  app.post('/api/auth/verify', (req, res) => {
    try {
      const { email, code } = req.body;
      console.log(\`[VERIFY ATTEMPT] Email: \${email}, Code Received: "\${code}"\`);
      
      if (!email || !code) {`;

if (code.includes(oldVerify)) {
  code = code.replace(oldVerify, newVerify);
}

const oldVerifyCheck = `      if (user.verificationCode !== code) {
        return res.status(400).json({ success: false, error: 'Invalid verification code.' });
      }`;

const newVerifyCheck = `      console.log(\`[VERIFY ATTEMPT] Expected Code: "\${user.verificationCode}"\`);
      if (user.verificationCode !== code) {
        console.log('[VERIFY ATTEMPT] Code mismatch!');
        return res.status(400).json({ success: false, error: 'Invalid verification code.' });
      } else {
        console.log('[VERIFY ATTEMPT] Code MATCHED!');
      }`;

if (code.includes(oldVerifyCheck)) {
  code = code.replace(oldVerifyCheck, newVerifyCheck);
}

fs.writeFileSync('server.js', code, 'utf8');
console.log('Added debug logs to verify route.');
