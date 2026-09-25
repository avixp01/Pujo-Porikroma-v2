const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

code = code.replace(
  /::-webkit-scrollbar\s*\{\s*width:\s*6px;\s*\}/,
  '::-webkit-scrollbar { width: 4px; }'
);
code = code.replace(
  /::-webkit-scrollbar-track\s*\{\s*background:\s*transparent;\s*\}/,
  '::-webkit-scrollbar-track { background: transparent; margin: 25px 0; }'
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log("Updated scrollbar CSS with regex.");
