const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div style=\{\{ display: 'flex', color: '#9ca3af' \}\}>\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"><\/circle><circle cx="12" cy="5" r="1"><\/circle><circle cx="12" cy="19" r="1"><\/circle><\/svg>\s*<\/div>/g;

const newContainer = `<div style={{ display: 'flex', color: '#9ca3af', position: 'relative' }}>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setTimelineMenuOpenIdx(timelineMenuOpenIdx === idx ? null : idx); }}
                                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px' }}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                </button>
                                
                                {timelineMenuOpenIdx === idx && (
                                  <div style={{ position: 'absolute', right: '0', top: '24px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, width: '120px', overflow: 'hidden' }}>
                                    <button 
                                      style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', borderBottom: '1px solid #f3f4f6', fontSize: '14px', fontWeight: '500', color: idx === 0 ? '#d1d5db' : '#374151', cursor: idx === 0 ? 'default' : 'pointer' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (idx > 0) {
                                          const next = [...plannedStops];
                                          [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                                          setPlannedStops(next);
                                        }
                                        setTimelineMenuOpenIdx(null);
                                      }}
                                    >Move up</button>
                                    <button 
                                      style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', borderBottom: '1px solid #f3f4f6', fontSize: '14px', fontWeight: '500', color: idx === plannedStops.length - 1 ? '#d1d5db' : '#374151', cursor: idx === plannedStops.length - 1 ? 'default' : 'pointer' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (idx < plannedStops.length - 1) {
                                          const next = [...plannedStops];
                                          [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                                          setPlannedStops(next);
                                        }
                                        setTimelineMenuOpenIdx(null);
                                      }}
                                    >Move down</button>
                                    <button 
                                      style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', fontSize: '14px', fontWeight: '500', color: '#991b1b', cursor: 'pointer' }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setPlannedStops(plannedStops.filter((_, i) => i !== idx));
                                        setTimelineMenuOpenIdx(null);
                                      }}
                                    >Remove</button>
                                  </div>
                                )}
                              </div>`;

if (regex.test(content)) {
    content = content.replace(regex, newContainer);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Added timeline menu!");
} else {
    console.log("Could not find the 3-dot container!");
}
