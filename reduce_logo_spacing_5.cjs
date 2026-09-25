const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchLogo2 = `<img src="/log-in-logo2.png" alt="Welcome" style={{ height: '18px', marginBottom: '-19px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))', position: 'relative', zIndex: 2 }} />`;
const replaceLogo2 = `<img src="/log-in-logo2.png" alt="Welcome" style={{ height: '18px', marginBottom: '-24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))', position: 'relative', zIndex: 2 }} />`;

code = code.replace(searchLogo2, replaceLogo2);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced spacing by another 5px (-24px margin)');
