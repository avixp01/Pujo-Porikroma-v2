const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /top: idx === plannedStops\.length - 1 \? 'auto' : '24px', bottom: idx === plannedStops\.length - 1 \? '24px' : 'auto'/g;

if (regex.test(content)) {
    content = content.replace(regex, `top: (idx >= plannedStops.length - 2 && idx > 0) ? 'auto' : '24px', bottom: (idx >= plannedStops.length - 2 && idx > 0) ? '24px' : 'auto'`);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully adjusted popup position for last two items!");
} else {
    console.log("Regex not found");
}
