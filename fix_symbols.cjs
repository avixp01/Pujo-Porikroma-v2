const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(/\{isVisited \? 'Visited[^']*' : 'Visited\?'\}/, "{isVisited ? 'Visited \u2713' : 'Visited?'}");

fs.writeFileSync(file, content);
console.log("Successfully fixed checkmark!");

