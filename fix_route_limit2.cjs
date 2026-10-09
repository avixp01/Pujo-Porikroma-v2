const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexOnClick = /onClick=\{\(\) => \{\s*if \(selectedLocation && selectedLocation\.type !== 'train'\) \{\s*if \(!plannedStops\.find\(s => s\.id === selectedLocation\.id\)\) \{\s*setPlannedStops\(\[\.\.\.plannedStops, selectedLocation\]\);\s*\} else \{\s*setPlannedStops\(plannedStops\.filter\(s => s\.id !== selectedLocation\.id\)\);\s*\}\s*\}\s*\}\}/;

if (regexOnClick.test(content)) {
    content = content.replace(regexOnClick, `onClick={() => {
                      if (selectedLocation && selectedLocation.type !== 'train') {
                        if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                          if (plannedStops.length < 10) {
                            setPlannedStops([...plannedStops, selectedLocation]);
                          }
                        } else {
                          setPlannedStops(plannedStops.filter(s => s.id !== selectedLocation.id));
                        }
                      }
                    }}`);
} else {
    console.log("Regex onClick failed.");
}

const regexRender = /<polyline points="20 6 9 17 4 12"><\/polyline><\/svg> Added<\/>\s*\) : \(/;

if (regexRender.test(content)) {
    content = content.replace(regexRender, `<polyline points="20 6 9 17 4 12"></polyline></svg> Added</>
                      ) : plannedStops.length >= 10 && selectedLocation?.type !== 'train' ? (
                        <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg> Route Full</>
                      ) : (`);
} else {
    console.log("Regex render failed.");
}

fs.writeFileSync(file, content, 'utf8');
console.log("Done checking replacements.");
