const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<\/button>[\s\n]*<\/div>[\s\n]*\{\/\* Nearby Overlay & Bottom Sheet \*\/\}/;
const replacement = `{/* Nearby Overlay & Bottom Sheet */}`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Success cleanup with regex");
} else {
    console.log("Regex failed too");
}
