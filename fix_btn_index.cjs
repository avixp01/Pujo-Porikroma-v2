const fs = require('fs');
let lines = fs.readFileSync('src/components/MapPage.jsx', 'utf8').split('\\n');

lines[1191] = "                    if (selectedLocation && selectedLocation.type === 'train') {\\r\\n                      setShowTimetablePopup(true);\\r\\n                    } else if (selectedLocation && selectedLocation.type !== 'train') {\\r";

fs.writeFileSync('src/components/MapPage.jsx', lines.join('\\n'), 'utf8');
console.log('Fixed button manually by line index');
