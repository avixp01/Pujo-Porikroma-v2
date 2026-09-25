const fs = require('fs');
const lines = fs.readFileSync('src/components/LoginModal.jsx', 'utf8').split('\n');
for (let i = 930; i < 975; i++) {
  if (lines[i] !== undefined) console.log(`${i + 1}: ${lines[i]}`);
}
