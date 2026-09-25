const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchStr = `<h2 style={{`;
const replaceStr = `<img src="/log-in-logo2.png" alt="Welcome" style={{ height: '24px', marginBottom: '12px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
          <img src="/log-in-logo1.png" alt="Pujo Porikroma" style={{ height: '110px', marginBottom: '16px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))' }} />
          <h2 style={{`;

code = code.replace(searchStr, replaceStr);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Added logos above Login text');
