const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /flexDirection: 'column',[\s\n]*gap: '8px',/;
const replacement = `flexDirection: 'column',`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully removed double gap");
} else {
    console.log("Regex failed");
}
