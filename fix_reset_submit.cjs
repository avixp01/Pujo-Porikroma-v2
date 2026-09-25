const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// The original submit button in reset_password:
const badSubmit = `<button type="button" onClick={() => navigateView('verify_reset_code')} style={{
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

const goodSubmit = `<button type="button" onClick={handleResetRequestSubmit} style={{
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

if (code.includes("onClick={() => navigateView('verify_reset_code')}")) {
  code = code.replace(badSubmit, goodSubmit);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('Fixed the submit button to actually call the backend!');
} else {
  console.log('Could not find the bad submit button.');
}
