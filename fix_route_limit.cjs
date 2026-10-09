const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the click handler logic
const oldClickHandler = `if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                          setPlannedStops([...plannedStops, selectedLocation]);
                          setActiveTab('routes');
                        }`;
const newClickHandler = `if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                          if (plannedStops.length >= 10) return;
                          setPlannedStops([...plannedStops, selectedLocation]);
                          setActiveTab('routes');
                        }`;
content = content.replace(oldClickHandler, newClickHandler);

// Replace the button text rendering logic
const oldRender = `) : plannedStops.find(s => s.id === selectedLocation?.id) ? (
                        <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Added</>
                      ) : (
                        <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                      )}`;

const newRender = `) : plannedStops.find(s => s.id === selectedLocation?.id) ? (
                        <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Added</>
                      ) : plannedStops.length >= 10 ? (
                        <span style={{ color: '#9ca3af', fontWeight: 'bold' }}>Route Full</span>
                      ) : (
                        <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                      )}`;

if (content.includes('Route</>')) {
    content = content.replace(oldRender, newRender);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Updated via string replacement!");
} else {
    console.log("Could not find the target string!");
}
