const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const target = `                        if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                          setPlannedStops([...plannedStops, selectedLocation]);
                          setActiveTab('routes');
                        } else {`;
const replacement = `                        if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                          setPlannedStops([...plannedStops, selectedLocation]);
                        } else {`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully removed auto-redirect to Routes tab.");
} else {
    console.log("Could not find the target string.");
}
