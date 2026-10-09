const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
  /<p className="share-loc-subtitle">? \{selectedLocation\?\.type/g,
  `<p className="share-loc-subtitle">{selectedLocation?.type`
);

fs.writeFileSync(file, content);
console.log("Successfully removed symbol from subtitle!");

