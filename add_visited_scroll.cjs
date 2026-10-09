const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetUl = `<ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>`;
const replaceUl = `<ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '330px', overflowY: 'auto', paddingRight: '4px' }}>`;

if (content.includes(targetUl)) {
    content = content.replace(targetUl, replaceUl);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully added maxHeight and scroll to VisitedPandalPopup list");
} else {
    console.log("Could not find the target ul.");
}
