const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<\/button>\s*<\/div>\s*\{\/\* FAB Overlay \*\/\}\s*<div style=\{\{ position: 'fixed', bottom: '80px', left: '0', right: '0', padding: '0 16px', zIndex: 100 \}\}>/g;

const replacement = `</button>
                    {/* FAB Overlay (Now part of normal flow) */}
                    <div style={{ marginTop: '5px', width: '100%' }}>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Moved FAB to normal flow with 5px gap!");
} else {
    console.log("Could not find the FAB container!");
}
