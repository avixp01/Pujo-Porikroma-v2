const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /Route timeline \(\{plannedStops\.length\}\)/g;
const newStr = `Route Stops ({plannedStops.length})`;

if (regex.test(content)) {
    content = content.replace(regex, newStr);
    console.log("Successfully replaced text!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the target string!");
}
