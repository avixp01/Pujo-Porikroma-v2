const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /setPlannedStops\(\[\.\.\.plannedStops, selectedLocation\]\);\s*setActiveTab\('routes'\);/;

if (regex.test(content)) {
    content = content.replace(regex, "setPlannedStops([...plannedStops, selectedLocation]);");
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully removed auto-redirect to Routes tab using regex.");
} else {
    console.log("Could not find the target using regex.");
}
