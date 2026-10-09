const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/marginTop: '12px'/g, "marginTop: '10px'");

fs.writeFileSync(file, content, 'utf8');
console.log("Reduced gap to 10px!");
