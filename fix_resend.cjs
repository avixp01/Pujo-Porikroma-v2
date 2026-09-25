const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const badResend = `Don't received code? <button type="button" onClick={(e) => { e.preventDefault(); handleRegisterSubmit(e); alert('A new verification code has been sent to your email!'); }} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Resend Now</button>`;
const goodResend = `Don't received code? <button type="button" onClick={(e) => { e.preventDefault(); handleResetRequestSubmit(e); alert('A new password reset code has been sent to your email!'); }} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Resend Now</button>`;

// Replace only the SECOND occurrence which belongs to verify_reset_code
let firstIndex = code.indexOf(badResend);
let secondIndex = code.indexOf(badResend, firstIndex + 1);

if (secondIndex !== -1) {
  code = code.substring(0, secondIndex) + goodResend + code.substring(secondIndex + badResend.length);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Fixed Resend button in verify_reset_code');
}
