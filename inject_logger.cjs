const fs = require('fs');
let code = fs.readFileSync('src/main.jsx', 'utf8');

const errLogger = `
window.addEventListener('error', (e) => {
    fetch('http://localhost:5174/log-error', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message: e.message, stack: e.error ? e.error.stack : '' }) 
    }).catch(console.error);
});
`;

if (!code.includes('log-error')) {
    code = errLogger + code;
    fs.writeFileSync('src/main.jsx', code);
    console.log('Injected error logger');
}
