const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /bottom: \(idx >= plannedStops\.length - 2 && idx > 0\) \? '12px' : 'auto'/g;

if (regex.test(content)) {
    content = content.replace(regex, `bottom: (idx >= plannedStops.length - 2 && idx > 0) ? '0px' : 'auto'`);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully adjusted upward popup to be even lower (0px).");
} else {
    console.log("Regex not found");
}
