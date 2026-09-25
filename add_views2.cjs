const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

code = code.replace(
  /if \(data\.success\) \{\s*onLogin\(\); \/\/ Log them in successfully\s*\} else \{\s*alert\(data\.error \|\| 'Invalid code\. Please try again\.'\);\s*\}/,
  `if (data.success) {
          setView('verify_success');
        } else {
          setView('verify_error');
        }`
);

const newViews = `

            {view === 'verify_success' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', width: '100%' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '2px solid #ff8a00', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '15px', boxShadow: '0 0 20px rgba(255, 107, 0, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="#ffb366" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0', textAlign: 'center' }}>
                  Welcome to Pujo Porikroma
                </h2>
                <p style={{ color: '#8c7366', fontSize: '15px', textAlign: 'center', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                  Your account has been successfully created and verified!
                </p>
                <button type="button" onClick={onLogin} style={{
                  width: '100%', backgroundColor: '#ff6b00', background: 'linear-gradient(to right, #ff8a00, #ff5e00)',
                  color: '#ffffff', border: 'none', borderRadius: '24px', padding: '12px', fontSize: '16px', fontWeight: '600',
                  cursor: 'pointer', boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'
                }}>Continue</button>
              </div>
            )}

            {view === 'verify_error' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', width: '100%' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '2px solid #ff3333', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '15px', boxShadow: '0 0 20px rgba(255, 51, 51, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="#ff5555" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '0 0 10px 0', textAlign: 'center' }}>
                  Incorrect Code
                </h2>
                <p style={{ color: '#8c7366', fontSize: '15px', textAlign: 'center', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                  The 5-digit verification code you entered does not match. Please check your email and try again.
                </p>
                <button type="button" onClick={() => setView('verify_code')} style={{
                  width: '100%', backgroundColor: '#33221c',
                  color: '#ffb366', border: '1px solid #ff8a00', borderRadius: '24px', padding: '12px', fontSize: '16px', fontWeight: '600',
                  cursor: 'pointer'
                }}>Go Back</button>
              </div>
            )}

          </div>
        </div>
      </div>
    );
`;

const endOfFile = /          <\/div>\s*<\/div>\s*<\/div>\s*\);\s*\};/g;

if (endOfFile.test(code)) {
  code = code.replace(endOfFile, newViews + "\n};");
} else {
  console.log("Could not find end of file.");
}

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully updated verification views.');
