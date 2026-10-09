const fs = require('fs');
let content = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const lines = content.split(/\\r?\\n/);
let modified = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("if (selectedLocation && selectedLocation.type !== 'train') {")) {
     if (lines[i-1].includes("onClick={() => {") && lines[i-1].includes("btn-route")) {
       lines[i] = `                    if (selectedLocation && selectedLocation.type === 'train') {
                      setShowTimetablePopup(true);
                    } else if (selectedLocation && selectedLocation.type !== 'train') {`;
       console.log('Replaced at line ' + i);
       modified = true;
     }
  }
}

if (modified) {
  fs.writeFileSync('src/components/MapPage.jsx', lines.join('\\n'), 'utf8');
} else {
  console.log("No modifications made");
}
