const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const regex = /\.map-preview-card\s*\{[\s\S]*?z-index:\s*1000;/;

if (regex.test(code)) {
    code = code.replace(regex, (match) => {
        return match.replace('z-index: 1000;', 'z-index: 1010;');
    });
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully increased z-index of map-preview-card");
} else {
    console.log("Could not find the target CSS");
}
