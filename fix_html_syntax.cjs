const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<\/button>\s*\{\/\* FAB Overlay \(Now part of normal flow\) \*\/\}\s*<div style=\{\{ marginTop: '5px', width: '100%' \}\}>/g;

const replacement = `</button>
                  </div>
                  {/* FAB Overlay (Now part of normal flow) */}
                  <div style={{ marginTop: '5px', padding: '0 16px', paddingBottom: '20px', width: '100%', boxSizing: 'border-box' }}>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Fixed HTML syntax and padding!");
} else {
    console.log("Could not find the broken tag!");
}
