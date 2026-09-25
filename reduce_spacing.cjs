const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

// Container padding 10px -> 3px
code = code.replace(/padding: '10px 0'/g, "padding: '3px 0'");

// Icon marginBottom 15px -> 8px
code = code.replace(/marginBottom: '15px'/g, "marginBottom: '8px'");

// h2 margin 10px -> 3px
code = code.replace(/margin: '0 0 10px 0'/g, "margin: '0 0 3px 0'");

// p margin 20px -> 13px
code = code.replace(/margin: '0 0 20px 0'/g, "margin: '0 0 13px 0'");

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Reduced spacing by 7px in verification popups!');
