const fs = require('fs');
const file = 'src/components/MapPage.css';
let content = fs.readFileSync(file, 'utf8');

const regex = /\.selected-marker-scale \{[\s\S]*\}\s*$/;
if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Removed selected-marker-scale CSS!");
} else {
    console.log("Could not find the CSS to remove!");
}
