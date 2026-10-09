const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/marginTop: '2px'/g, "marginTop: '-1px'");

fs.writeFileSync(file, content, 'utf8');
console.log("Reduced gap by another 3px (-1px margin)!");
