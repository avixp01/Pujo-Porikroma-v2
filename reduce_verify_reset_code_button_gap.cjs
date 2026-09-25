const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Reduce marginBottom of the "Enter Code" button in verify_reset_code view from 16px to 11px
code = code.replace(
  /cursor:\s*'pointer',\s*marginBottom:\s*'16px',\s*boxShadow:\s*'0\s+4px\s+16px\s+rgba\(255,\s*107,\s*0,\s*0\.4\)'/,
  "cursor: 'pointer',\n                  marginBottom: '11px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'"
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Successfully reduced gap between button and text by 5px in verify_reset_code view.');
