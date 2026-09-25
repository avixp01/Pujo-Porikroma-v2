const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Update the onClick of the Submit button in reset_password
const searchButton = `<button type="button" onClick={() => setView('login')} style={{
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
                marginBottom: '10px',
                boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
              }}>
                Submit
              </button>`;

const replaceButton = `<button type="button" onClick={() => setView('verify_reset_code')} style={{
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
                marginBottom: '10px',
                boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
              }}>
                Submit
              </button>`;

code = code.replace(searchButton, replaceButton);

// 2. Add the new verify_reset_code view
const verifyResetCodeView = `
          {view === 'verify_reset_code' && (
            <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0', width: '100%' }}>
              <h2 style={{
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: '700',
                margin: '0 0 12px 0',
                textAlign: 'center'
              }}>Verify Your Code</h2>

              <p style={{
                color: '#8c7366',
                fontSize: '14px',
                textAlign: 'left',
                lineHeight: '1.5',
                margin: '0 0 20px 0'
              }}>
                Please enter the 5-digit verification code we sent to your registered email to proceed securely.
              </p>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', marginBottom: '28px' }}>
                {[...Array(5)].map((_, i) => (
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
                ))}
              </div>

              <button type="button" onClick={onLogin} style={{
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
                marginBottom: '16px',
                boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
              }}>
                Enter Code
              </button>

              <div style={{ color: '#8c7366', fontSize: '14px', textAlign: 'center' }}>
                Don't received code? <button type="button" onClick={() => {}} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Resend Now</button> <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '400' }}>or </span><button type="button" onClick={() => setView('login')} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Log In</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};`;

code = code.replace(/        <\/div>\n      <\/div>\n    <\/div>\n  \);\n\};/, verifyResetCodeView);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully added verify_reset_code view and updated Submit button onClick.');
