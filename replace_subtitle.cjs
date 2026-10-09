const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `Your completed pujo journey`;
const replaceStr = `In case you have forgotten`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully replaced the subtitle text.");
} else {
    console.log("Could not find the target string.");
}
