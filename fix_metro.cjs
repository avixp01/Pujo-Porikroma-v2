const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(/ \{distText\}/g, "&bull; {distText}");
fs.writeFileSync(file, content);
console.log("Fixed bullet!");

