const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(/<span className="metro-name">\{nearestMetro \|\| "Metro Station"\}<\/span>.*\{distText\}/, `<span className="metro-name">{nearestMetro || "Metro Station"}</span> &bull; {distText}`);
fs.writeFileSync(file, content);
console.log("Fixed bullet 2!");

