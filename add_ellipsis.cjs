const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `<span style={{ color: '#f5e6d3', fontSize: '14px', fontWeight: '500', flex: 1 }}>{typeof item === 'object' ? item.name : item}</span>`;
const replaceStr = `<span style={{ color: '#f5e6d3', fontSize: '14px', fontWeight: '500', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{typeof item === 'object' ? item.name : item}</span>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully added text truncation (ellipsis) to VisitedPandalPopup.");
} else {
    console.log("Could not find the target string.");
}
