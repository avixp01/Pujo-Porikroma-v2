const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `Search pandals or add from map</div>`;
const replaceStr = `Add more pandels from map</div>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully replaced text!");
} else {
    console.log("Could not find the target string!");
}
