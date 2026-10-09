const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div style=\{\{ position: 'absolute', right: '0', top: '24px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba\(0,0,0,0\.12\)', padding: '8px 0', zIndex: 100, width: '160px', border: '1px solid #f3f4f6' \}\}>/g;

if (regex.test(content)) {
    content = content.replace(regex, `<div style={{ position: 'absolute', right: '0', top: idx === plannedStops.length - 1 ? 'auto' : '24px', bottom: idx === plannedStops.length - 1 ? '24px' : 'auto', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: '8px 0', zIndex: 100, width: '160px', border: '1px solid #f3f4f6' }}>`);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully adjusted popup position for last item!");
} else {
    console.log("Regex not found");
}
