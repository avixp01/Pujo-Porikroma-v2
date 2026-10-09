const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexMapContainer = /<MapContainer\s+center=\{plannedStops\.length > 0 \? plannedStops\[0\]\.position : \[22\.5726, 88\.3639\]\}/g;

if (regexMapContainer.test(content)) {
    content = content.replace(regexMapContainer, '<MapContainer\n                      center={[22.5726, 88.3639]}');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully fixed MapContainer center prop!");
} else {
    console.log("Regex failed. Looking for alternate match.");
    // try a more loose regex
    const looseRegex = /<MapContainer[\s\S]*?center=\{[^}]*\}/;
    if (looseRegex.test(content)) {
        content = content.replace(looseRegex, (match) => {
             return match.replace(/center=\{[^}]*\}/, 'center={[22.5726, 88.3639]}');
        });
        fs.writeFileSync(file, content, 'utf8');
        console.log("Successfully fixed MapContainer center prop (loose match)!");
    }
}
