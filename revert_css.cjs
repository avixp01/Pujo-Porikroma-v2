const fs = require('fs');
const file = 'src/components/MapPage.css';
let content = fs.readFileSync(file, 'utf8');

const regex = /\/\* Selected Marker Animation \*\/[\s\S]*$/;
if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Removed marker animation CSS!");
} else {
    console.log("Could not find the CSS to remove!");
}
