const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Delete reset_verify view completely
const resetVerifyStart = code.indexOf("{view === 'reset_verify' && (");
if (resetVerifyStart !== -1) {
  // Find the end of this block by searching for the next view or end of container
  // A simple way is to use a regex or string replacement.
  // We know it ends before {view === 'login_error' or similar, but wait, I inserted reset_verify before login_error.
  // Actually, I can just replace the entire block with empty string.
  
  const resetVerifyBlockRegex = /\{view === 'reset_verify' && \([\s\S]*?\)\}/;
  code = code.replace(resetVerifyBlockRegex, '');
}

// 2. Wire up the original verify_reset_code view
const oldDummyInputs = `{[...Array(5)].map((_, i) => (
                  <input 
                    key={i}
                    type="text"
                    maxLength="1"
                    style={{
                      width: '45px',
                      height: '55px',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid #4a2f22',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '24px',
                      fontWeight: '600',
                      textAlign: 'center',
                      outline: 'none',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                ))}`;

const newRealInputs = `{codeDigits.map((digit, index) => (
                  <input 
                    key={index}
                    id={\`verify-reset-code-\${index}\`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => {
                      if (/[^0-9]/.test(e.target.value)) return;
                      const newDigits = [...codeDigits];
                      newDigits[index] = e.target.value;
                      setCodeDigits(newDigits);
                      if (e.target.value && index < 4) {
                        const nextInput = document.getElementById(\`verify-reset-code-\${index + 1}\`);
                        if (nextInput) nextInput.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
                        const prevInput = document.getElementById(\`verify-reset-code-\${index - 1}\`);
                        if (prevInput) prevInput.focus();
                      }
                    }}
                    style={{
                      width: '45px',
                      height: '55px',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid #4a2f22',
                      borderRadius: '12px',
                      color: '#ffffff',
                      fontSize: '24px',
                      fontWeight: '600',
                      textAlign: 'center',
                      outline: 'none',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff8a00'}
                    onBlur={(e) => e.target.style.borderColor = '#4a2f22'}
                  />
                ))}`;

if (code.includes('{[...Array(5)]')) {
  code = code.replace(oldDummyInputs, newRealInputs);
}

// 3. Fix the Enter Code button in verify_reset_code
// The original was: <button type="button" onClick={view === 'verify_code' ? handleVerifySubmit : onLogin}
// We want it to be handleResetVerifySubmit
const oldEnterCodeBtn = `<button type="button" onClick={view === 'verify_code' ? handleVerifySubmit : onLogin} style={{
                  width: '100%',
                  backgroundColor: '#ff6b00',
                background: 'linear-gradient(to right, #ff8a00, #ff5e00)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '24px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                  marginBottom: '8px',
                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
              }}>
                Enter Code
              </button>`;
const newEnterCodeBtn = `<button type="button" onClick={handleResetVerifySubmit} style={{
                  width: '100%',
                  backgroundColor: '#ff6b00',
                  background: 'linear-gradient(to right, #ff8a00, #ff5e00)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
              }}>
                Enter Code
              </button>`;

if (code.includes("onClick={view === 'verify_code' ? handleVerifySubmit : onLogin}")) {
  code = code.replace(oldEnterCodeBtn, newEnterCodeBtn);
}

// 4. Update handleResetRequestSubmit to use 'verify_reset_code' instead of 'reset_verify'
code = code.replace(/setView\('reset_verify'\)/g, "setView('verify_reset_code')");

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Fixed the original verify_reset_code view!');
