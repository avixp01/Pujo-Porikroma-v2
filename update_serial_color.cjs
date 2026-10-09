const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `<div style={{ backgroundColor: '#7c2d12', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>`;

const newStr = `<div style={{ backgroundColor: '#fef3c7', color: '#7c2d12', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, newStr);
    console.log("Successfully updated circle colors!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the target string!");
}
