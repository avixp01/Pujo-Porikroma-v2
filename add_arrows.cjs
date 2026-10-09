const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<div style=\{\{\s*display:\s*'none',\s*gap:\s*'12px',\s*color:\s*'#9ca3af'\s*\}\}>\s*<svg[^>]+><circle[^>]+><\/circle><circle[^>]+><\/circle><circle[^>]+><\/circle><\/svg>\s*<svg[^>]+><line[^>]+><\/line><line[^>]+><\/line><line[^>]+><\/line><\/svg>\s*<\/div>/g;

const replacement = `<div style={{ display: 'none', gap: '12px', color: '#9ca3af' }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button 
                                onClick={() => {
                                  if (idx > 0) {
                                    const newStops = [...plannedStops];
                                    [newStops[idx - 1], newStops[idx]] = [newStops[idx], newStops[idx - 1]];
                                    setPlannedStops(newStops);
                                  }
                                }}
                                style={{ 
                                  background: 'none', border: 'none', padding: '4px', cursor: idx > 0 ? 'pointer' : 'default',
                                  color: idx > 0 ? '#4b5563' : '#d1d5db'
                                }}
                              >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                              </button>
                              
                              <button 
                                onClick={() => {
                                  if (idx < plannedStops.length - 1) {
                                    const newStops = [...plannedStops];
                                    [newStops[idx], newStops[idx + 1]] = [newStops[idx + 1], newStops[idx]];
                                    setPlannedStops(newStops);
                                  }
                                }}
                                style={{ 
                                  background: 'none', border: 'none', padding: '4px', cursor: idx < plannedStops.length - 1 ? 'pointer' : 'default',
                                  color: idx < plannedStops.length - 1 ? '#4b5563' : '#d1d5db'
                                }}
                              >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                              </button>
                            </div>`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done arrows');
} else {
  console.log('not found');
}
