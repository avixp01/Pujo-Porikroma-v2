const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetStr = `wordBreak: 'break-word'`;
const replacement = `overflowWrap: 'break-word', wordBreak: 'normal'`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully fixed word break!");
} else {
    console.log("Could not find the target string.");
}

