const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const timelineRegex = /<div className="route-timeline-list" style=\{\{\s*position:\s*'relative',\s*flex:\s*1,\s*overflowY:\s*'auto',\s*paddingRight:\s*'4px',\s*minHeight:\s*'100px'\s*\}\}>/;
if (timelineRegex.test(code)) {
  code = code.replace(timelineRegex, `<div className="route-timeline-list" style={{ position: 'relative', flex: 1, overflowY: 'auto', paddingRight: '4px', minHeight: '100px', paddingBottom: '120px' }}>`);
  console.log('replaced timeline list padding');
} else {
  console.log('timeline regex not found');
}

// Remove the old Next Stop button
const nextStopBlock = `<div style={{ flexShrink: 0, marginTop: '16px' }}>
                    <button style={{ width: '100%', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('map')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c2d12', marginRight: '16px' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <div>
                          <div style={{ color: '#7c2d12', fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>Next stop</div>
                          <div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'left' }}>Search pandals or add from map</div>
                        </div>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                  </div>`;

// Wait, I might have different indentation or newlines. Let's use a regex to remove it.
const nextStopRegex = /<div style=\{\{\s*flexShrink:\s*0,\s*marginTop:\s*'16px'\s*\}\}>\s*<button style=\{\{\s*width:\s*'100%',\s*padding:\s*'16px',\s*backgroundColor:\s*'#fff7ed',\s*borderRadius:\s*'12px',\s*display:\s*'flex',\s*justifyContent:\s*'space-between',\s*alignItems:\s*'center',\s*border:\s*'none',\s*cursor:\s*'pointer'\s*\}\} onClick=\{.*?\}>\s*<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center'\s*\}\}>\s*<div style=\{\{.*?\}>\s*<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2\.5"><line x1="12" y1="5" x2="12" y2="19"><\/line><line x1="5" y1="12" x2="19" y2="12"><\/line><\/svg>\s*<\/div>\s*<div>\s*<div style=\{\{.*?\}>Next stop<\/div>\s*<div style=\{\{.*?\}>Search pandals or add from map<\/div>\s*<\/div>\s*<\/div>\s*<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2\.5"><polyline points="9 18 15 12 9 6"><\/polyline><\/svg>\s*<\/button>\s*<\/div>/;

if (nextStopRegex.test(code)) {
  code = code.replace(nextStopRegex, '');
  console.log('removed old next stop');
} else {
  console.log('old next stop not found');
}

// Insert the new Next Stop button before FAB Overlay
const fabRegex = /\{\/\* FAB Overlay \*\/\}/;
const newNextStop = `{/* Next Stop Fixed Overlay */}
                <div style={{ position: 'fixed', bottom: '150px', left: '16px', right: '16px', zIndex: 90 }}>
                  <button style={{ width: '100%', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #fed7aa', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} onClick={() => setActiveTab('map')}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c2d12', marginRight: '16px' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                        <div>
                          <div style={{ color: '#7c2d12', fontSize: '15px', fontWeight: 'bold', textAlign: 'left' }}>Next stop</div>
                          <div style={{ color: '#9ca3af', fontSize: '13px', textAlign: 'left' }}>Search pandals or add from map</div>
                        </div>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>

                {/* FAB Overlay */}`;

if (fabRegex.test(code)) {
  code = code.replace(fabRegex, newNextStop);
  console.log('inserted new next stop');
} else {
  console.log('fab overlay not found');
}

fs.writeFileSync('src/components/MapPage.jsx', code);
