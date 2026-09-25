const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1 & 4. Change inner padding to reduce top and bottom gaps by 5px
code = code.replace(/padding: '24px 20px',/g, "padding: '19px 20px',");

// 2. Reduce gap between logo1 and Login by 5px (4px -> -1px)
const searchLogo1 = `<img src="/log-in-logo1.png" alt="Pujo Porikroma" style={{ width: '200px', height: 'auto', marginBottom: '4px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))' }} />`;
const replaceLogo1 = `<img src="/log-in-logo1.png" alt="Pujo Porikroma" style={{ width: '200px', height: 'auto', marginBottom: '-1px', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))' }} />`;
code = code.replace(searchLogo1, replaceLogo1);

// 3. Reduce gap between Login and Username by 5px (16px -> 11px)
const searchH2 = `margin: '0 0 16px 0',`;
const replaceH2 = `margin: '0 0 11px 0',`;
code = code.replace(searchH2, replaceH2);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced spacing as marked by 5px');
