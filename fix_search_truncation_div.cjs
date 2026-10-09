const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex1 = /<span style=\{\{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 \}\}>\{loc\.name\}<\/span>/g;
const replacement1 = `<div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>{loc.name}</div>`;

if (regex1.test(content)) {
    content = content.replace(regex1, replacement1);
    console.log("Fixed loc.name truncation by using div.");
} else {
    console.log("Could not find loc.name span.");
}

const regex2 = /<span style=\{\{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 \}\}>Back to home<\/span>/g;
const replacement2 = `<div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>Back to home</div>`;

if (regex2.test(content)) {
    content = content.replace(regex2, replacement2);
    console.log("Fixed home truncation by using div.");
}

// Also let's double check if we need to add width to the parent dropdown
const targetDropdown = `padding: '16px 13px',
                  maxHeight: '65vh'`;
const replaceDropdown = `padding: '16px 13px',
                  maxHeight: '65vh',
                  overflowX: 'hidden'`;
if (content.includes(targetDropdown)) {
    content = content.replace(targetDropdown, replaceDropdown);
    console.log("Added overflowX hidden to dropdown.");
}

fs.writeFileSync(file, content, 'utf8');
