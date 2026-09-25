const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const target = 'padding-top: 4px;';
if (code.includes(target)) {
    code = code.replace(target, 'padding-top: 0px;');
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully removed padding-top from direction-modes");
} else {
    console.log("Could not find the target CSS");
}
