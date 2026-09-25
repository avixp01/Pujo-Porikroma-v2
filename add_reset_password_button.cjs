const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchString = `                  </button>\n                </div>\n  \n                \n              </div>`;
const replacementString = `                  </button>
                </div>
  
                <button type="button" onClick={() => setView('login')} style={{
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
                </button>
  
                <div style={{ color: '#8c7366', fontSize: '14px', marginBottom: '-1px', textAlign: 'center' }}>
                  Already have an acount ? <button type="button" onClick={() => setView('login')} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Signin</button>
                </div>
              </div>`;

code = code.replace(searchString, replacementString);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully added Submit button and text to reset_password view.');
