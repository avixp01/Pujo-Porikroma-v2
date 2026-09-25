const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Add states
const stateInjection = `  const [resetEmail, setResetEmail] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');`;

if (!code.includes('const [resetEmail')) {
  code = code.replace(`const [regGender, setRegGender] = useState('');`, `const [regGender, setRegGender] = useState('');\n${stateInjection}`);
}

// 2. Add handlers
const handlers = `
  const handleResetRequestSubmit = async (e) => {
    e.preventDefault();
    if (resetPassword.length < 8 || resetPassword !== resetConfirmPassword) return;
    try {
      const response = await fetch('/api/auth/reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await response.json();
      if (data.success) {
        setCodeDigits(['', '', '', '', '']); // Clear digits for safety
        setView('reset_verify');
      } else {
        setView('reset_error');
      }
    } catch (err) {
      setView('reset_error');
    }
  };

  const handleResetVerifySubmit = async (e) => {
    e.preventDefault();
    const fullCode = codeDigits.join('');
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, code: fullCode, newPassword: resetPassword })
      });
      const data = await response.json();
      if (data.success) {
        alert('Password has been successfully reset! Please log in.');
        setView('login');
      } else {
        setView('verify_error');
      }
    } catch (err) {
      setView('verify_error');
    }
  };
`;

if (!code.includes('handleResetRequestSubmit')) {
  code = code.replace(`const handleLoginSubmit = async (e) => {`, handlers + `\n  const handleLoginSubmit = async (e) => {`);
}

// 3. Update the Reset Your Password form
const oldEmailReset = `<input type="text" placeholder="wadewarren@gmail.com" style={{...inputStyle, padding: '14px 16px', fontSize: '15px'}} />`;
const newEmailReset = `<input type="text" placeholder="wadewarren@gmail.com" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required style={{...inputStyle, padding: '14px 16px', fontSize: '15px'}} />`;

const oldPassLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Password</label>`;
const newPassLabel = `<label style={{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Password {resetPassword.length > 0 && resetPassword.length < 8 && <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' }}>minimum 8 characters</span>}</label>`;

const oldPassInput = `<input type={showResetPassword ? "text" : "password"} placeholder="Enter your new password" style={{...inputStyle, padding: '14px 16px', paddingRight: '40px', fontSize: '15px'}} />`;
const newPassInput = `<input type={showResetPassword ? "text" : "password"} placeholder="Enter your new password" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} required style={{...inputStyle, padding: '14px 16px', paddingRight: '40px', fontSize: '15px'}} />`;

const oldConfLabel = `<label style={{ display: 'flex', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Confirm Password</label>`;
const newConfLabel = `<label style={{ display: 'flex', alignItems: 'center', color: '#ffb366', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>Confirm Password {resetConfirmPassword && resetPassword !== resetConfirmPassword && <span style={{ color: '#ff4d4d', fontSize: '12px', marginLeft: '8px' }}>not matched</span>}</label>`;

const oldConfInput = `<input type={showResetConfirm ? "text" : "password"} placeholder="Confirm your new password" style={{...inputStyle, padding: '14px 16px', paddingRight: '40px', fontSize: '15px'}} />`;
const newConfInput = `<input type={showResetConfirm ? "text" : "password"} placeholder="Confirm your new password" value={resetConfirmPassword} onChange={(e) => setResetConfirmPassword(e.target.value)} required style={{...inputStyle, padding: '14px 16px', paddingRight: '40px', fontSize: '15px'}} />`;

const oldResetSubmit = `<button type="button" style={{`;
const newResetSubmit = `<button type="button" onClick={handleResetRequestSubmit} style={{`;

// Careful with button replacement, make sure it's the right one.
// Let's use exact string matching for the reset button.
const oldResetSubmitBlock = `<button type="button" style={{
                  width: '100%',
                  backgroundColor: '#ff6b00',
                  background: 'linear-gradient(to right, #ff8a00, #ff5e00)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
                  marginBottom: '16px'
                }}>Submit</button>`;
const newResetSubmitBlock = oldResetSubmitBlock.replace(`<button type="button"`, `<button type="button" onClick={handleResetRequestSubmit}`);

code = code.replace(oldEmailReset, newEmailReset);
code = code.replace(oldPassLabel, newPassLabel);
code = code.replace(oldPassInput, newPassInput);
code = code.replace(oldConfLabel, newConfLabel);
code = code.replace(oldConfInput, newConfInput);
code = code.replace(oldResetSubmitBlock, newResetSubmitBlock);


// 4. Add reset_error and reset_verify views
const resetViews = `{view === 'reset_error' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3px 0', width: '100%' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '2px solid #ff3333', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '5px', boxShadow: '0 0 20px rgba(255, 51, 51, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="#ff5555" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '0 0 1px 0', textAlign: 'center' }}>
                  Email not found
                </h2>
                <p style={{ color: '#8c7366', fontSize: '15px', textAlign: 'center', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                  We couldn't find an account associated with this email address.
                </p>
                <button type="button" onClick={() => setView('reset_password')} style={{
                  width: '100%', backgroundColor: '#33221c',
                  color: '#ffb366', border: '1px solid #ff8a00', borderRadius: '24px', padding: '12px', fontSize: '16px', fontWeight: '600',
                  cursor: 'pointer'
                }}>Go Back</button>
              </div>
            )}
            
            {view === 'reset_verify' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', width: '100%' }}>
                <h2 style={{
                  color: '#ffffff',
                  fontSize: '28px',
                  fontWeight: '700',
                  margin: '0 0 8px 0',
                  textAlign: 'center'
                }}>Verify Your Code</h2>
                <p style={{ color: '#8c7366', fontSize: '14px', textAlign: 'center', lineHeight: '1.5', margin: '0 0 24px 0', padding: '0 10px' }}>
                  Please enter the 5-digit verification code we sent to your registered email to proceed securely.
                </p>
  
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px', width: '100%' }}>
                  {codeDigits.map((digit, index) => (
                    <input
                      key={index}
                      id={\`reset-code-\${index}\`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value, 'reset')}
                      onKeyDown={(e) => handleCodeKeyDown(index, e, 'reset')}
                      style={{
                        width: '45px', height: '55px',
                        backgroundColor: 'transparent',
                        border: '1px solid #4a332a',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '24px',
                        fontWeight: '600',
                        textAlign: 'center',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ff8a00'}
                      onBlur={(e) => e.target.style.borderColor = '#4a332a'}
                    />
                  ))}
                </div>
  
                <button type="button" onClick={handleResetVerifySubmit} style={{
                  width: '100%',
                  backgroundColor: '#ff6b00',
                  background: 'linear-gradient(to right, #ff8a00, #ff5e00)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)',
                  marginBottom: '16px'
                }}>Enter Code</button>
  
                <div style={{ color: '#8c7366', fontSize: '14px', textAlign: 'center', marginBottom: '-2px' }}>
                  Don't received code? <button type="button" onClick={(e) => { e.preventDefault(); handleResetRequestSubmit(e); alert('A new reset code has been sent to your email!'); }} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Resend Now</button> <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '400' }}>or </span><button type="button" onClick={() => navigateView('login')} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Log In</button>
                </div>
              </div>
            )}`;

if (!code.includes("view === 'reset_error'")) {
  code = code.replace(`{view === 'login_error'`, resetViews + `\n\n            {view === 'login_error'`);
}

// 5. Update handleCodeChange and handleCodeKeyDown to work with both verification flows
const oldHandleCodeChange = `const handleCodeChange = (index, value) => {
      if (/[^0-9]/.test(value)) return;
      const newCode = [...codeDigits];
      newCode[index] = value;
      setCodeDigits(newCode);
      if (value !== '' && index < 4) {
        document.getElementById(\`code-\${index + 1}\`).focus();
      }
    };`;
const newHandleCodeChange = `const handleCodeChange = (index, value, type = 'register') => {
      if (/[^0-9]/.test(value)) return;
      const newCode = [...codeDigits];
      newCode[index] = value;
      setCodeDigits(newCode);
      if (value !== '' && index < 4) {
        const prefix = type === 'reset' ? 'reset-code-' : 'code-';
        document.getElementById(\`\${prefix}\${index + 1}\`).focus();
      }
    };`;

const oldHandleCodeKeyDown = `const handleCodeKeyDown = (index, e) => {
      if (e.key === 'Backspace' && codeDigits[index] === '' && index > 0) {
        document.getElementById(\`code-\${index - 1}\`).focus();
      }
    };`;
const newHandleCodeKeyDown = `const handleCodeKeyDown = (index, e, type = 'register') => {
      if (e.key === 'Backspace' && codeDigits[index] === '' && index > 0) {
        const prefix = type === 'reset' ? 'reset-code-' : 'code-';
        document.getElementById(\`\${prefix}\${index - 1}\`).focus();
      }
    };`;

code = code.replace(oldHandleCodeChange, newHandleCodeChange);
code = code.replace(oldHandleCodeKeyDown, newHandleCodeKeyDown);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Added reset password frontend logic!');
