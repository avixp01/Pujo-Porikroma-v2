const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<button className=\{\`btn-route \$\{plannedStops\.find\(s => s\.id === selectedLocation\?\.id\) \? 'added' : ''\}\`\} onClick=\{[\s\S]*?\}>(?:\s*)\{selectedLocation && selectedLocation\.type === 'train' \? \([\s\S]*?Timetable<\/>\s*\) : plannedStops\.find\(s => s\.id === selectedLocation\?\.id\) \? \([\s\S]*?Added<\/>\s*\) : \([\s\S]*?Route<\/>\s*\)\}\s*<\/button>/;

const replacement = `<button className={\`btn-route \${plannedStops.find(s => s.id === selectedLocation?.id) ? 'added' : ''}\`} onClick={() => {
                      if (selectedLocation && selectedLocation.type !== 'train') {
                        if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                          if (plannedStops.length >= 10) return;
                          setPlannedStops([...plannedStops, selectedLocation]);
                          setActiveTab('routes');
                        } else {
                          setPlannedStops(plannedStops.filter(s => s.id !== selectedLocation.id));
                        }
                      }
                    }}>
                      {selectedLocation && selectedLocation.type === 'train' ? (
                        <><Clock size={18} /> Timetable</>
                      ) : plannedStops.find(s => s.id === selectedLocation?.id) ? (
                        <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Added</>
                      ) : plannedStops.length >= 10 ? (
                        <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>Route Full</span>
                      ) : (
                        <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                      )}
                    </button>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Replaced entire button!");
} else {
    console.log("Could not find entire button block!");
}
