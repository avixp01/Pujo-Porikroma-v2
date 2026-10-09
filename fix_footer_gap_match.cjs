const fs = require('fs');
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div style=\{\{ opacity: 0\.8, marginTop: '1px' \}\}>/g;
if (regex.test(content)) {
    content = content.replace(regex, `<div style={{ opacity: 0.8, marginTop: '0px' }}>`);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Matched gaps!");
} else {
    console.log("Could not find the new line!");
}
