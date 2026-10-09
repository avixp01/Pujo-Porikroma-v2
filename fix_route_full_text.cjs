const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<p className="routes-header-subtitle">\{plannedStops\.length\} of 10 Stops Planned<\/p>/g;
const replacement = `<p className="routes-header-subtitle" style={plannedStops.length >= 10 ? { color: '#7c2d12', fontWeight: '600' } : {}}>
                  {plannedStops.length >= 10 ? '10 of 10 added - route is full' : \`\${plannedStops.length} of 10 Stops Planned\`}
                </p>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Updated full route text!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the subtitle text!");
}
