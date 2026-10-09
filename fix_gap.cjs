const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace paddingBottom: '24px' with '16px' in the timeline list item
content = content.replace(/paddingBottom:\s*'24px'/g, "paddingBottom: '16px'");

fs.writeFileSync(file, content, 'utf8');
console.log("Reduced gap to 16px.");
