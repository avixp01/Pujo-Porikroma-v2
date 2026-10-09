const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<p className="routes-header-subtitle">.*?\{plannedStops\.length\} stops planned<\/p>/g;
const replacement = `<p className="routes-header-subtitle">{plannedStops.length} of 10 Stops Planned</p>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Updated subtitle text!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find subtitle text!");
}
