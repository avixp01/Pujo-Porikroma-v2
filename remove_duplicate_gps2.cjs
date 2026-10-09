const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{poorAccuracy && \(\s*<div className="px-5 pb-3 pt-1">\s*<button[^>]*>\s*<svg[^>]*>[\s\S]*?<\/svg>\s*Poor GPS signal\. Tap to force refresh\.\s*<\/button>\s*<\/div>\s*\)\}/;
if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Removed duplicate GPS warning!");
} else {
    console.log("Could not find duplicate GPS warning!");
}
