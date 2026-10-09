const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const controlsRegex = /<div style=\{\{ position: 'absolute', right: '16px', bottom: '100px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 10 \}\}>/g;
if (controlsRegex.test(content)) {
    content = content.replace(controlsRegex, `<div style={{ position: 'absolute', right: '16px', bottom: '100px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2000 }}>`);
}

const panelRegex = /<div style=\{\{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '12px', zIndex: 10 \}\}>/g;
if (panelRegex.test(content)) {
    content = content.replace(panelRegex, `<div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '12px', zIndex: 2000 }}>`);
}

fs.writeFileSync(file, content, 'utf8');
console.log("Updated zIndex of navigation UI elements!");
