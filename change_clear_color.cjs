const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `<span onClick={handleClearAll} style={{ color: '#60a5fa', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>Clear all</span>`;
const replaceStr = `<span onClick={handleClearAll} style={{ color: '#ffffff', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>Clear all</span>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully changed clear all to white.");
} else {
    console.log("Could not find the target string.");
}
