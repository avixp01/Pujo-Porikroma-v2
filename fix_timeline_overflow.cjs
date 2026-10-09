const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div style=\{\{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' \}\}>\s*<div>/g;

const newDiv = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <div style={{ flex: 1, minWidth: 0, paddingRight: '12px' }}>`;

if (regex.test(content)) {
    content = content.replace(regex, newDiv);
    console.log("Successfully constrained timeline text block!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find timeline text block!");
}
