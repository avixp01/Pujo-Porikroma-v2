const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div style=\{\{ fontSize: '14px', color: '#6b7280', textTransform: 'capitalize' \}\}>\{stop\.type\}<\/div>/;

const newDiv = `<div style={{ fontSize: '14px', color: '#6b7280' }}>
                                  {(stop.type === 'pandal' && stop.address) ? stop.address : (stop.category ? \`\${stop.type.charAt(0).toUpperCase() + stop.type.slice(1)} • \${stop.category}\` : stop.type.charAt(0).toUpperCase() + stop.type.slice(1))}
                                </div>`;

if (regex.test(content)) {
    content = content.replace(regex, newDiv);
    console.log("Successfully updated timeline stop subtitle!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find timeline stop subtitle!");
}
