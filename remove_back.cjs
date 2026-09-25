const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const backButtonBlock = `              {/* Added a back button to cancel */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <button type="button" onClick={() => setView('login')} style={{ background: 'none', border: 'none', color: '#ffb366', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0', fontSize: '14px', fontWeight: '500' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back to Login
                </button>
              </div>\n\n`;

code = code.replace(backButtonBlock, '');

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Removed Back to Login button');
