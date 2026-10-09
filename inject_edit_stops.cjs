const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const stateTarget = /const \[activeTab, setActiveTab\] = useState\('map'\); \/\/ 'map' or 'routes'/;
const stateReplace = `const [activeTab, setActiveTab] = useState('map'); // 'map' or 'routes'
  const [isEditingStops, setIsEditingStops] = useState(false);`;

const editBtnTarget = /<button style=\{\{ color: '#7c2d12', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' \}\}>Edit stops <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"><\/path><path d="M18\.5 2\.5a2\.121 2\.121 0 0 1 3 3L12 15l-4 1 1-4 9\.5-9\.5z"><\/path><\/svg><\/button>/;

const editBtnReplace = `<button onClick={() => setIsEditingStops(!isEditingStops)} style={{ color: '#7c2d12', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {isEditingStops ? 'Done' : 'Edit stops'}
                          {!isEditingStops && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>}
                        </button>`;

const itemBtnsTarget = /<div style=\{\{ display: 'flex', gap: '4px' \}\}>[\s\S]*?<button[\s\S]*?onClick=\{[\s\S]*?idx > 0[\s\S]*?\}\s*style=\{[\s\S]*?\}[\s\S]*?>[\s\S]*?<svg[\s\S]*?polyline points="18 15 12 9 6 15"[\s\S]*?<\/svg>\s*<\/button>\s*<button[\s\S]*?onClick=\{[\s\S]*?idx < plannedStops\.length - 1[\s\S]*?\}\s*style=\{[\s\S]*?\}[\s\S]*?>[\s\S]*?<svg[\s\S]*?polyline points="6 9 12 15 18 9"[\s\S]*?<\/svg>\s*<\/button>\s*<\/div>/;

const itemBtnsReplace = `<div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                {isEditingStops ? (
                                  <button
                                    onClick={() => {
                                      const newStops = plannedStops.filter((_, i) => i !== idx);
                                      setPlannedStops(newStops);
                                    }}
                                    style={{
                                      background: 'none', border: 'none', padding: '8px', cursor: 'pointer',
                                      color: '#ef4444'
                                    }}
                                  >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                  </button>
                                ) : (
                                  <>
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
                                  </>
                                )}
                              </div>`;

let modified = false;

if (stateTarget.test(code)) {
  code = code.replace(stateTarget, stateReplace);
  modified = true;
  console.log("State injected.");
} else {
  console.log("State target NOT found.");
}

if (editBtnTarget.test(code)) {
  code = code.replace(editBtnTarget, editBtnReplace);
  modified = true;
  console.log("Edit button replaced.");
} else {
  console.log("Edit button target NOT found.");
}

if (itemBtnsTarget.test(code)) {
  code = code.replace(itemBtnsTarget, itemBtnsReplace);
  modified = true;
  console.log("Item buttons replaced.");
} else {
  console.log("Item buttons target NOT found.");
}

if (modified) {
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log("File saved.");
}
