const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchStyleInject = `fontFamily: "'Outfit', sans-serif"\n    }}>`;
const replaceStyleInject = `fontFamily: "'Outfit', sans-serif"\n    }}>\n      <style>\n        {\`\n          @keyframes zoomInLogo2 {\n            0% { transform: scale(0.2); opacity: 0; }\n            70% { transform: scale(1.1); opacity: 1; }\n            100% { transform: scale(1); opacity: 1; }\n          }\n        \`}\n      </style>`;

code = code.replace(searchStyleInject, replaceStyleInject);

const searchImg = `<img src="/log-in-logo2.png" alt="Welcome" style={{ height: '18px', marginBottom: '-24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))', position: 'relative', zIndex: 2 }} />`;
const replaceImg = `<img src="/log-in-logo2.png" alt="Welcome" style={{ height: '18px', marginBottom: '-24px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))', position: 'relative', zIndex: 2, animation: 'zoomInLogo2 0.8s ease-out forwards' }} />`;

code = code.replace(searchImg, replaceImg);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Added zoom animation to logo2');
