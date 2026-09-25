const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const target = `justify-content: space-around;`;
const replacement = `justify-content: center;\n  gap: 12px;`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully updated to center alignment and fixed gap");
} else {
    // regex fallback
    const regex = /justify-content:\s*space-around;/;
    if (regex.test(code)) {
        code = code.replace(regex, replacement);
        fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
        console.log("Successfully updated with regex");
    } else {
        console.log("Could not find space-around");
    }
}
