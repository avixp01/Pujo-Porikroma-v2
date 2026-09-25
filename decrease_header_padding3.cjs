const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const regex = /padding:\s*\d+px\s+16px\s+12px\s+16px;/g;
if (regex.test(code)) {
    code = code.replace(regex, 'padding: 25px 16px 12px 16px; /* Top padding decreased by 8px */');
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully decreased top padding");
} else {
    console.log("Could not find target");
}
