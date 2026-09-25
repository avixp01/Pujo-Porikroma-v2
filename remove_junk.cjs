const fs = require('fs');
const lines = fs.readFileSync('src/components/LoginModal.jsx', 'utf8').split('\n');
const newLines = [...lines.slice(0, 950), ...lines.slice(975)];
fs.writeFileSync('src/components/LoginModal.jsx', newLines.join('\n'), 'utf8');
console.log('Removed junk!');
