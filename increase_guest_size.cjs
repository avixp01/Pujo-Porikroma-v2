const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchText = `onClick={onLogin} style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Guest</button>`;
const replaceText = `onClick={onLogin} style={{ color: '#ffffff', fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', padding: 0 }}>Guest</button>`;

code = code.replace(searchText, replaceText);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Increased size of Guest text successfully.');
