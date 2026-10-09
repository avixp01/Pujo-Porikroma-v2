const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetRegex = /\{poorAccuracy && \(\s*<div className="px-5 pb-3 pt-1">\s*<button[\s\S]*?Poor GPS signal\. Tap to force refresh\.[\s\S]*?<\/button>\s*<\/div>\s*\)\}/;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, "");
    fs.writeFileSync(file, content);
    console.log("Successfully removed the inner GPS warning!");
} else {
    console.log("Could not find the target string.");
}

