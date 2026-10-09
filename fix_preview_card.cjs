const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetStr = `<div className={\`map-preview-card \${selectedLocation ? 'active' : ''}\`}>`;
const replacement = `<div className={\`map-preview-card \${selectedLocation && !isDirectionPopupOpen ? 'active' : ''}\`}>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully replaced map-preview-card condition!");
} else {
    console.log("Could not find the target string.");
}

