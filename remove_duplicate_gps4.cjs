const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{poorAccuracy && \([\s\S]*?<div className="px-5 pb-3 pt-1">[\s\S]*?Poor GPS signal\. Tap to force refresh\.[\s\S]*?<\/button>\s*<\/div>\s*\)\}/;
if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Removed duplicate GPS warning via flexible regex!");
} else {
    console.log("Could not find duplicate GPS warning via flexible regex!");
}
