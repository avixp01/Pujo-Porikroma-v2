const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(/â€º/g, '›');
code = code.replace(/â€“/g, '–');
code = code.replace(/â—ˆ/g, '◈');
code = code.replace(/âž¤/g, '➤');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed remaining garbled characters.');
