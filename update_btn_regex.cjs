const fs = require('fs');
let content = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const updated = content.replace(
  /onClick=\{\(\) => \{\s*if \(selectedLocation && selectedLocation\.type !== 'train'\) \{/g,
  "onClick={() => {\n                    if (selectedLocation && selectedLocation.type === 'train') {\n                      setShowTimetablePopup(true);\n                    } else if (selectedLocation && selectedLocation.type !== 'train') {"
);

if (content !== updated) {
  fs.writeFileSync('src/components/MapPage.jsx', updated, 'utf8');
  console.log("Replaced!");
} else {
  console.log("No match found");
}
