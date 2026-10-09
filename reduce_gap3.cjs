const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetStr = `className="preview-metro-info" style={{ marginBottom: "2px" }}`;
const replacement = `className="preview-metro-info" style={{ marginBottom: "0px" }}`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully reduced the gap to 0px!");
} else {
    console.log("Could not find the target string.");
}

