const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const regex = /async function sendVerificationEmail\(email, code, name\) \{[\s\S]*?\}\s*\}\s*\}/;

const newFunc = `async function sendVerificationEmail(email, code, name) {
  const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.GMAIL_PASS;

  // Development Fallback Log Option
  console.log(\`\\n=========================================\`);
  console.log(\`[GENERATED VERIFICATION CODE] \${code}\`);
  console.log(\`[TARGET EMAIL] \${email}\`);
  console.log(\`=========================================\\n\`);

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass }
      });

      console.log(\`[VERIFICATION EMAIL] Attempting to send email via SMTP (\${smtpUser})...\`);

      await transporter.sendMail({
        from: '"from Pujo Porikroma" <' + smtpUser + '>',
        to: email,
        subject: 'Your Pujo Porikroma Verification Code',
        html: \`
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a100c; color: #ffffff; padding: 40px 20px; text-align: center; border-radius: 12px; max-width: 600px; margin: 0 auto;">
            <img src="cid:pujologo" alt="Pujo Porikroma" style="width: 200px; height: auto; margin-bottom: 20px; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));" />
            
            <h1 style="color: #ffb366; margin-bottom: 10px; font-size: 24px;">Welcome to Pujo Porikroma</h1>
            <p style="font-size: 16px; color: #d9c3b8; margin-bottom: 30px;">Hello \${name}, please verify your email address to complete your registration.</p>
            
            <div style="background-color: #2a1a14; border: 1px solid #4a2f22; border-radius: 12px; padding: 20px; display: inline-block; margin-bottom: 30px;">
              <p style="margin: 0; font-size: 14px; color: #ffb366; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Your Unique Code</p>
              <h2 style="margin: 0; font-size: 48px; color: #ffffff; letter-spacing: 6px;">\${code}</h2>
            </div>
            
            <div style="background-color: rgba(255, 107, 0, 0.1); border-left: 4px solid #ff6b00; padding: 15px; margin-bottom: 20px; text-align: left; border-radius: 4px;">
              <p style="margin: 0; font-size: 15px; color: #ffb366; font-weight: bold; margin-bottom: 8px;">⚠️ Security Precautions:</p>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #a68a7c; line-height: 1.6;">
                <li>Do not share this unique code with anyone.</li>
                <li>Pujo Porikroma support will never ask you for your password or code.</li>
                <li>This code is valid for exactly 15 minutes.</li>
              </ul>
            </div>
            
            <p style="font-size: 12px; color: #735c52; margin-top: 30px;">
              &copy; \${new Date().getFullYear()} Pujo Porikroma. All rights reserved.
            </p>
          </div>
        \`,
        attachments: [
          {
            filename: 'log-in-logo1.png',
            path: path.join(process.cwd(), 'public', 'log-in-logo1.png'),
            cid: 'pujologo'
          }
        ]
      });
      console.log(\`[VERIFICATION EMAIL] Successfully sent to \${email}\`);
    } catch (err) {
      console.error('\\n[SMTP ERROR] Failed to send verification email. Details:');
      console.error(err);
      console.error('Please check your EMAIL_USER and EMAIL_PASS environment variables.\\n');
    }
  } else {
    console.log(\`[VERIFICATION EMAIL] No SMTP credentials (EMAIL_USER / EMAIL_PASS) configured in .env. Email skipped.\`);
  }
}`;

code = code.replace(regex, newFunc);
fs.writeFileSync('server.js', code, 'utf8');
console.log('Successfully updated verification email function.');
