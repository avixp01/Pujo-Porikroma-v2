const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace("? Move closer to the pandal or mark a recent visit to update.", "Move closer to the pandal or mark a recent visit to update.");
content = content.replace("? Submit update", "Submit update");

fs.writeFileSync(file, content);
console.log("Successfully removed question marks!");

