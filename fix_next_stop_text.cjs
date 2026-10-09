const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Search pandals or add from map/g, "Add more Pandals from map");

fs.writeFileSync(file, content, 'utf8');
console.log("Updated next stop subtitle!");
