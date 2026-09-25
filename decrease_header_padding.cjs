const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const target = 'padding: 55px 16px 12px 16px; /* Top padding increased by 18px */';
const replacement = 'padding: 44px 16px 12px 16px; /* Top padding decreased by 11px */';

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully decreased top padding");
} else {
    const regex = /padding:\s*\d+px\s+16px\s+12px\s+16px;/g;
    if (regex.test(code)) {
        code = code.replace(regex, 'padding: 44px 16px 12px 16px;');
        fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
        console.log("Successfully decreased top padding with regex");
    } else {
        console.log("Could not find target");
    }
}
