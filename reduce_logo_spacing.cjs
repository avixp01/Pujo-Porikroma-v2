const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchLogo2 = `<img src="/log-in-logo2.png" alt="Welcome" style={{ height: '18px', marginBottom: '8px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />`;
const replaceLogo2 = `<img src="/log-in-logo2.png" alt="Welcome" style={{ height: '18px', marginBottom: '0px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />`;

const searchLogo1 = `<img src="/log-in-logo1.png" alt="Pujo Porikroma" style={{ width: '200px', height: 'auto', marginBottom: '12px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))' }} />`;
const replaceLogo1 = `<img src="/log-in-logo1.png" alt="Pujo Porikroma" style={{ width: '200px', height: 'auto', marginBottom: '4px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))' }} />`;

code = code.replace(searchLogo2, replaceLogo2);
code = code.replace(searchLogo1, replaceLogo1);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Adjusted logo spacing');
