const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const regex = /padding-bottom: max\(20px, env\(safe-area-inset-bottom\)\);/;
const replacement = `padding-bottom: 35px;`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
console.log("Successfully increased padding-bottom by 15px");
