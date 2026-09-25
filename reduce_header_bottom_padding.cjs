const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const regex = /padding: 25px 16px 12px 16px;.*?\n/g;

if (regex.test(code)) {
    code = code.replace(regex, 'padding: 25px 16px 8px 16px;\n');
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully reduced bottom padding of direction header");
} else {
    console.log("Could not find the target CSS");
}
