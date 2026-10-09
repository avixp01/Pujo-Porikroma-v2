const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Target 1
const regex1 = /if \(!plannedStops\.find\(s => s\.id === selectedLocation\.id\)\) \{\s*setPlannedStops\(\[\.\.\.plannedStops, selectedLocation\]\);\s*setActiveTab\('routes'\);\s*\} else \{\s*setPlannedStops\(plannedStops\.filter\(s => s\.id !== selectedLocation\.id\)\);\s*\}/;

const replace1 = `if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                        if (plannedStops.length >= 10) return;
                        setPlannedStops([...plannedStops, selectedLocation]);
                        setActiveTab('routes');
                      } else {
                        setPlannedStops(plannedStops.filter(s => s.id !== selectedLocation.id));
                      }`;

if (regex1.test(code)) {
  code = code.replace(regex1, replace1);
  console.log('regex1 replaced');
} else {
  console.log('regex1 not found');
}

// Target 2
const regex2 = /\) : plannedStops\.find\(s => s\.id === selectedLocation\?\.id\) \? \(\s*<>[^<]+Added<\/>\s*\) : \(\s*<><svg/;

const replace2 = `) : plannedStops.find(s => s.id === selectedLocation?.id) ? (
                      <>✔ Added</>
                    ) : plannedStops.length >= 10 ? (
                      <>Route Full</>
                    ) : (
                      <><svg`;

if (regex2.test(code)) {
  code = code.replace(regex2, replace2);
  console.log('regex2 replaced');
} else {
  console.log('regex2 not found');
}

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done regex limits');
