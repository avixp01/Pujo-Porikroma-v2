const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexDropdown = /padding: '16px 13px',\s*maxHeight: '65vh'/g;
const replaceDropdown = `padding: '16px 13px',\n                  maxHeight: '65vh',\n                  overflowX: 'hidden'`;

if (regexDropdown.test(content)) {
    content = content.replace(regexDropdown, replaceDropdown);
    console.log("Added overflowX hidden to dropdown.");
} else {
    console.log("Could not find dropdown regex.");
}

fs.writeFileSync(file, content, 'utf8');
