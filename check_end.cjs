const fs = require('fs');
const lines = fs.readFileSync('src/components/LoginModal.jsx', 'utf8').split('\n');
for (let i = 950; i < 980; i++) {
  if (lines[i]) console.log(`${i + 1}: ${lines[i]}`);
}
