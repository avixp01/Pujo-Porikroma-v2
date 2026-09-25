const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const regex = /padding: 25px 16px 8px 16px;/g;

if (regex.test(code)) {
    code = code.replace(regex, 'padding: 17px 16px 8px 16px; /* Top padding decreased by 8px to uplift */');
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully uplifted the direction header");
} else {
    console.log("Could not find the target CSS");
}
