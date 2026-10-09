const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /marginTop: '-3px'/g;
if (regex.test(content)) {
    content = content.replace(regex, "marginTop: '-6px'");
}

fs.writeFileSync(file, content, 'utf8');
console.log("Reduced gap by 3px!");
