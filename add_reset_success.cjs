const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Replace alert with setView
const oldAlert = `alert('Password has been successfully reset! Please log in.');
        setView('login');`;
const newAlert = `setView('reset_success');`;

if (code.includes(oldAlert)) {
  code = code.replace(oldAlert, newAlert);
}

// 2. Add reset_success block right before verify_success
const resetSuccessBlock = `{view === 'reset_success' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px 0', width: '100%' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '2px solid #ff8a00', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '4px', boxShadow: '0 0 20px rgba(255, 107, 0, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="#ffb366" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '10px 0 15px 0', textAlign: 'center', lineHeight: '1.2', padding: '0 10px' }}>
                  Your password is successfully reset
                </h2>
                <button type="button" onClick={() => setView('login')} style={{
                  width: '100%', backgroundColor: '#33221c',
                  color: '#ffb366', border: '1px solid #ff8a00', borderRadius: '24px', padding: '12px', fontSize: '16px', fontWeight: '600',
                  cursor: 'pointer', marginTop: '10px'
                }}>Go Back</button>
              </div>
            )}

            `;

if (!code.includes("view === 'reset_success'")) {
  code = code.replace("{view === 'verify_success'", resetSuccessBlock + "{view === 'verify_success'");
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Added reset success view!');
} else {
  console.log('Already exists');
}
