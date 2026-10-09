const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\/\/ Add clear route logic here if needed in the future/g;
const replacement = `setPlannedStops([]);`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Added clear route logic!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the comment!");
}
