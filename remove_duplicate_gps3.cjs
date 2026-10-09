const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const strToReplace = `{poorAccuracy && (
                            <div className="px-5 pb-3 pt-1">
                              <button 
                                onClick={(e) => { e.preventDefault(); startTracking(); }}
                                style={{ width: '100%', backgroundColor: '#f59e0b', color: 'white', fontSize: '12px', fontWeight: 'bold', padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
                                  <circle cx="12" cy="12" r="10"/>
                                  <line x1="12" y1="8" x2="12" y2="12"/>
                                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                                Poor GPS signal. Tap to force refresh.
                              </button>
                            </div>
                          )}`;

if (content.includes(strToReplace)) {
    content = content.replace(strToReplace, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Removed duplicate GPS warning via exact match!");
} else {
    console.log("Could not find duplicate GPS warning via exact match!");
}
