const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `{plannedStops.map((stop, idx) => (
                        <Marker 
                          key={idx}
                          position={stop.position}`;
                          
const replacementStr = `{plannedStops.filter(s => s && s.position && Array.isArray(s.position)).map((stop, idx) => (
                        <Marker 
                          key={idx}
                          position={stop.position}`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully filtered invalid markers!");
} else {
    console.log("Could not find the target string!");
}
