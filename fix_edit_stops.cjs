const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add state
const stateRegex = /const \[timelineMenuOpenIdx, setTimelineMenuOpenIdx\] = useState\(null\);/g;
if (content.includes('const [timelineMenuOpenIdx, setTimelineMenuOpenIdx] = useState(null);')) {
    content = content.replace(stateRegex, `const [timelineMenuOpenIdx, setTimelineMenuOpenIdx] = useState(null);\n  const [isEditingStops, setIsEditingStops] = useState(false);`);
    console.log("Added state!");
}

// 2. Replace Edit stops button
const editBtnRegex = /<button style=\{\{ color: '#7c2d12', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' \}\}>Edit stops <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"><\/path><path d="M18\.5 2\.5a2\.121 2\.121 0 0 1 3 3L12 15l-4 1 1-4 9\.5-9\.5z"><\/path><\/svg><\/button>/g;

const newEditBtn = `{isEditingStops ? (
                          <button style={{ color: '#7c2d12', fontSize: '14px', fontWeight: 'bold' }} onClick={() => setIsEditingStops(false)}>Done</button>
                        ) : (
                          <button style={{ color: '#7c2d12', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setIsEditingStops(true)}>Edit stops <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                        )}`;

if (regexTest(editBtnRegex, content)) {
    content = content.replace(editBtnRegex, newEditBtn);
    console.log("Replaced Edit stops button!");
}

// 3. Replace 3-dot container
const dotContainerRegex = /<div style=\{\{ display: 'flex', color: '#9ca3af', position: 'relative' \}\}>\s*<button \s*onClick=\{\(e\) => \{ e\.stopPropagation\(\); setTimelineMenuOpenIdx\(timelineMenuOpenIdx === idx \? null : idx\); \}\}\s*style=\{\{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px' \}\}\s*>\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"><\/circle><circle cx="12" cy="5" r="1"><\/circle><circle cx="12" cy="19" r="1"><\/circle><\/svg>\s*<\/button>\s*\{timelineMenuOpenIdx === idx && \([\s\S]*?<\/div>\s*\)\}\s*<\/div>/g;

const newDotContainer = `<div style={{ display: 'flex', color: '#9ca3af', position: 'relative' }}>
                                {isEditingStops ? (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setPlannedStops(plannedStops.filter((_, i) => i !== idx));
                                    }}
                                    style={{ background: '#fef3c7', border: 'none', color: '#7c2d12', cursor: 'pointer', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                  >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                  </button>
                                ) : (
                                  <>
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
                                  </>
                                )}
                              </div>`;

function regexTest(reg, c) {
    reg.lastIndex = 0;
    return reg.test(c);
}

if (regexTest(dotContainerRegex, content)) {
    content = content.replace(dotContainerRegex, newDotContainer);
    console.log("Replaced dot container!");
} else {
    console.log("Could not find the dot container!");
}

fs.writeFileSync(file, content, 'utf8');
