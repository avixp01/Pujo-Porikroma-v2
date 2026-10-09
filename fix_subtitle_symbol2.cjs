const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
  `<p className="share-loc-subtitle">? {selectedLocation?.type`,
  `<p className="share-loc-subtitle">{selectedLocation?.type`
);

content = content.replace(
  `<p className="share-loc-subtitle">?3 Schedule</p>`,
  `<p className="share-loc-subtitle">Schedule</p>`
);

content = content.replace(
  `<p className="share-loc-subtitle">? Schedule</p>`,
  `<p className="share-loc-subtitle">Schedule</p>`
);

// Just in case it got corrupted
content = content.replace(/<p className="share-loc-subtitle">[^\{<]*\{selectedLocation/g, `<p className="share-loc-subtitle">{selectedLocation`);
content = content.replace(/<p className="share-loc-subtitle">[^S<]*Schedule<\/p>/g, `<p className="share-loc-subtitle">Schedule</p>`);

fs.writeFileSync(file, content);
console.log("Successfully cleaned up subtitles!");

