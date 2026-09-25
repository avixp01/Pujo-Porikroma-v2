const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const oldH2 = `<h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '10px 0 15px 0', textAlign: 'center', lineHeight: '1.2', padding: '0 10px' }}>`;
const newH2 = `<h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', margin: '4px 0 9px 0', textAlign: 'center', lineHeight: '1.2', padding: '0 10px' }}>`;

const blockStart = code.indexOf("view === 'reset_success'");
const blockEnd = code.indexOf("view === 'verify_success'", blockStart);

let block = code.substring(blockStart, blockEnd);
block = block.replace(oldH2, newH2);

code = code.substring(0, blockStart) + block + code.substring(blockEnd);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced margins by 6px!');
