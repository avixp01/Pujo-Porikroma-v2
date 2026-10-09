const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /marginTop: '0px'/g;
if (regex.test(content)) {
    content = content.replace(regex, "marginTop: '-2px'");
}

const lineRegex = /lineHeight: '1\.2'/g;
if (lineRegex.test(content)) {
    content = content.replace(lineRegex, "lineHeight: '1.1'");
}

fs.writeFileSync(file, content, 'utf8');
console.log("Reduced gap more!");
