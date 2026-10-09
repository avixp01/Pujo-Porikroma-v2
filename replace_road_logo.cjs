const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>`;

const roadSVG = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22L10 2"></path><path d="M20 22L14 2"></path><path d="M12 22v-4"></path><path d="M12 14v-4"></path><path d="M12 6V2"></path></svg>`;

if (content.includes(targetSVG)) {
    content = content.split(targetSVG).join(roadSVG);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully replaced map pin with road logo!");
} else {
    console.log("Could not find the target SVG string!");
}
