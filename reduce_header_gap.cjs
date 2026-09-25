const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const regex = /gap: 16px;\s*box-shadow/g;

if (regex.test(code)) {
    code = code.replace(regex, 'gap: 8px;\n  box-shadow');
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully reduced gap in direction-header");
} else {
    console.log("Could not find the target CSS");
}
