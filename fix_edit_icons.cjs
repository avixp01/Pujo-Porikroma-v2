const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexIcons = /<div style=\{\{\s*display:\s*'flex',\s*gap:\s*'12px',\s*color:\s*'#9ca3af'\s*\}\}>\s*<svg width="20" height="20".*?<\/circle><\/svg>\s*<svg width="20" height="20".*?<\/line><\/svg>\s*<\/div>/;

if (regexIcons.test(content)) {
    content = content.replace(regexIcons, `<div style={{ display: 'flex', gap: '12px', color: '#9ca3af', alignItems: 'center' }}>
                                {isEditingRoute ? (
                                  <div 
                                    style={{ width: '28px', height: '28px', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                    onClick={() => {
                                      const newStops = [...plannedStops];
                                      newStops.splice(idx, 1);
                                      setPlannedStops(newStops);
                                    }}
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                  </div>
                                ) : (
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                )}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                              </div>`);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully replaced the icons!");
} else {
    console.log("Could not find the icon block!");
}
