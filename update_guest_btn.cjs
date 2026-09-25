const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetStr = `onClick={onLogin} style={{ color: '#ffffff', fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Guest</button>`;

const replacementStr = `onClick={() => { localStorage.removeItem('pujoUser'); onLogin(); }} style={{ color: '#ffffff', fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Guest</button>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
  console.log('LoginModal updated to clear localStorage on Guest login.');
} else {
  console.log('Target string not found in LoginModal.');
}
