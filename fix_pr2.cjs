const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(/className="flex-1 min-w-0 pr-3"/g, `className="flex-1 min-w-0 pr-[10px]"`);
fs.writeFileSync(file, content);
console.log("Fixed padding to 10px!");

