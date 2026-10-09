const fs = require('fs');
const file = 'src/App.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /marginBottom: '4px'/g;
if (regex.test(content)) {
    content = content.replace(regex, "marginBottom: '1px'");
    fs.writeFileSync(file, content, 'utf8');
    console.log("Reduced margin-bottom by 3px in App.jsx!");
} else {
    console.log("Could not find marginBottom: '4px'");
}
