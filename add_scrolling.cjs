const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="route-timeline-list" style=\{\{ position: 'relative' \}\}>/g;
const replacement = `<div className="route-timeline-list hide-scrollbar" style={{ position: 'relative', maxHeight: '320px', overflowY: 'auto' }}>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Added scrolling to route timeline!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find route timeline list!");
}
