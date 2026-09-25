const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchText = `Don't received code? <button type="button" onClick={() => {}} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Resend Now</button>`;
const replaceText = `Don't received code? <button type="button" onClick={() => {}} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Resend Now</button> <span style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '400' }}>or </span><button type="button" onClick={() => setView('login')} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Log In</button>`;

code = code.replace(searchText, replaceText);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Added Log In button successfully');
