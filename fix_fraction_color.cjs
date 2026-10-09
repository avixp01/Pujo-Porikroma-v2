const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<span style=\{\{ color: '#9ca3af', fontSize: '13px', fontWeight: 'normal', marginLeft: '4px' \}\}>\{plannedStops\.length\}\/10<\/span>/g;
const replacement = `<span style={{ color: plannedStops.length >= 10 ? '#7c2d12' : '#9ca3af', fontSize: '13px', fontWeight: plannedStops.length >= 10 ? 'bold' : 'normal', marginLeft: '4px' }}>{plannedStops.length}/10</span>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    console.log("Updated fraction color!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the fraction text!");
}
