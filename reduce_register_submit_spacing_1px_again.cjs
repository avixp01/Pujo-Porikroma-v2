const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// 1. Below Gender block (5px -> 4px)
code = code.replace(
  /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*marginBottom:\s*'5px',\s*gap:\s*'16px'\s*\}\}>/,
  `<div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', gap: '16px' }}>`
);

// 2. Below Submit button (10px -> 9px)
code = code.replace(
  /cursor:\s*'pointer',\n\s*marginBottom:\s*'10px',\n\s*boxShadow:\s*'0 4px 16px rgba\(255, 107, 0, 0\.4\)'\n\s*\}\}>\n\s*Submit\n\s*<\/button>/,
  `cursor: 'pointer',\n                      marginBottom: '9px',\n                      boxShadow: '0 4px 16px rgba(255, 107, 0, 0.4)'\n                    }}>\n                      Submit\n                    </button>`
);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced spacing above and below Submit button by 1px.');
