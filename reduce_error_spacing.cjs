const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldErrorBlock = `{view === 'verify_error' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3px 0', width: '100%' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '2px solid #ff3333', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '8px', boxShadow: '0 0 20px rgba(255, 51, 51, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="#ff5555" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '0 0 3px 0', textAlign: 'center' }}>
                  Incorrect Code
                </h2>
                <p style={{ color: '#8c7366', fontSize: '15px', textAlign: 'center', lineHeight: '1.5', margin: '0 0 13px 0' }}>
                  The 5-digit verification code you entered does not match. Please check your email and try again.
                </p>
                <button type="button" onClick={() => setView('verify_code')} style={{
                  width: '100%', backgroundColor: '#33221c',
                  color: '#ffb366', border: '1px solid #ff8a00', borderRadius: '24px', padding: '12px', fontSize: '16px', fontWeight: '600',
                  cursor: 'pointer'
                }}>Go Back</button>
              </div>
            )}`;

const newErrorBlock = `{view === 'verify_error' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3px 0', width: '100%' }}>
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.4)',
                  border: '2px solid #ff3333', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '6px', boxShadow: '0 0 20px rgba(255, 51, 51, 0.2)'
                }}>
                  <svg viewBox="0 0 24 24" width="36" height="36" stroke="#ff5555" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '0 0 1px 0', textAlign: 'center' }}>
                  Incorrect Code
                </h2>
                <p style={{ color: '#8c7366', fontSize: '15px', textAlign: 'center', lineHeight: '1.5', margin: '0 0 11px 0' }}>
                  The 5-digit verification code you entered does not match. Please check your email and try again.
                </p>
                <button type="button" onClick={() => setView('verify_code')} style={{
                  width: '100%', backgroundColor: '#33221c',
                  color: '#ffb366', border: '1px solid #ff8a00', borderRadius: '24px', padding: '12px', fontSize: '16px', fontWeight: '600',
                  cursor: 'pointer'
                }}>Go Back</button>
              </div>
            )}`;

if (code.includes(oldErrorBlock)) {
  code = code.replace(oldErrorBlock, newErrorBlock);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Reduced verify_error spacing by 2px.');
} else {
  console.log('Could not find exact verify_error block.');
}
