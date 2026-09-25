const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const targetLine = `<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0' }}>
              {/* CONFIRM EMAIL VIEW */}`;

const newLine = `<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0' }}>
              {/* CONFIRM EMAIL VIEW */}`;

if(code.includes(targetLine)) {
    code = code.replace(targetLine, newLine);
    fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
    console.log('Reduced vertical padding of confirm_email view by 6px');
} else {
    console.log('Could not find the target string');
}
