const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchStr = `<span style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '400' }}>as a text</span>`;
const replaceStr = `<span style={{ color: 'rgba(255, 255, 255, 0.5)', fontWeight: '400' }}>or as a </span><button type="button" onClick={onLogin} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Guest</button>`;

code = code.replace(searchStr, replaceStr);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced text with Guest link');
