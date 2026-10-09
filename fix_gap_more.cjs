const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace paddingBottom: '16px' with '10px' in the timeline list item
content = content.replace(/paddingBottom:\s*'16px'/g, "paddingBottom: '10px'");

fs.writeFileSync(file, content, 'utf8');
console.log("Reduced gap to 10px.");
