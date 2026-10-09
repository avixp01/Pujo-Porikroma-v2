const fs = require('fs');
const file = 'src/components/SettingsPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<span style=\{\{ color: '#ffffff', fontWeight: 'bold', fontSize: '16px', letterSpacing: '0\.5px' \}\}>view<\/span>/g;
const replaceStr = `<span style={{ color: '#ffffff', fontWeight: '500', fontSize: '16px', letterSpacing: '0.5px' }}>view</span>`;

if (regex.test(content)) {
    content = content.replace(regex, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully made view text less bold!");
} else {
    console.log("Could not find target string with regex.");
}
