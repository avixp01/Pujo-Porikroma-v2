const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Below Gender block (11px -> 8px)
code = code.replace(
  /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*marginBottom:\s*'11px',\s*gap:\s*'16px'\s*\}\}>/,
  `<div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', gap: '16px' }}>`
);

// 2. Below Submit button (16px -> 13px)
code = code.replace(
  /cursor:\s*'pointer',\n\s*marginBottom:\s*'16px',\n\s*boxShadow:\s*'0 4px 16px rgba\(255, 107, 0, 0\.4\)'\n\s*\}\}>\n\s*Submit\n\s*<\/button>/,
  `cursor: 'pointer',\n                    marginBottom: '13px',\n                    boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                  }}>\n                    Submit\n                  </button>`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced spacing above and below Submit button by 3px.');
