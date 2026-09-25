const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

let newCode = code.replace(
  /padding:\s*'12px',\s*fontSize:\s*'16px',\s*fontWeight:\s*'600',\s*cursor:\s*'pointer',\s*marginBottom:\s*'16px',\s*boxShadow:\s*'0 4px 16px rgba\(255, 107, 0, 0\.4\)'\s*\}\}>\s*Verification/g,
  `padding: '12px',\n                  fontSize: '16px',\n                  fontWeight: '600',\n                  cursor: 'pointer',\n                  marginBottom: '12px',\n                  boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                }}>\n                  Verification`
);

fs.writeFileSync('src/components/LoginModal.jsx', newCode, 'utf8');
console.log('Fixed Verification button formatting and margin.');
