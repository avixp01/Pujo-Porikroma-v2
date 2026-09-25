const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<button className="btn-route">\s*<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"><\/line><line x1="5" y1="12" x2="19" y2="12"><\/line><\/svg> Route\s*<\/button>/;

const replacement = `<button className="btn-route">
                  {selectedLocation && selectedLocation.type === 'train' ? (
                    <><Clock size={18} /> Timetable</>
                  ) : (
                    <><svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route</>
                  )}
                </button>`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully replaced Route button with dynamic Timetable button for trains");
