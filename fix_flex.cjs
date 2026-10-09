const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const t1 = `<div className="routes-active-itinerary">`;
const r1 = `<div className="routes-active-itinerary" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>`;

const t2 = `<div style={{ padding: '20px 16px' }}>`;
const r2 = `<div style={{ padding: '20px 16px 90px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>`;

const t3 = `<div className="route-timeline-list" style={{ position: 'relative', maxHeight: '250px', overflowY: 'auto', paddingRight: '4px' }}>`;
const r3 = `<div className="route-timeline-list" style={{ position: 'relative', flex: 1, overflowY: 'auto', paddingRight: '4px', minHeight: '100px' }}>`;

const t4 = `<button style={{ width: '100%', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('map')}>`;
const r4 = `<div style={{ flexShrink: 0, marginTop: '16px' }}>
                    <button style={{ width: '100%', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('map')}>`;

// And we need to close the div for r4.
const t5 = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>`;
const r5 = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                  </div>
                </div>`;

if (code.includes(t1)) code = code.replace(t1, r1);
else console.log('t1 not found');

if (code.includes(t2)) code = code.replace(t2, r2);
else console.log('t2 not found');

if (code.includes(t3)) code = code.replace(t3, r3);
else console.log('t3 not found');

if (code.includes(t4)) code = code.replace(t4, r4);
else console.log('t4 not found');

if (code.includes(t5)) code = code.replace(t5, r5);
else console.log('t5 not found');

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done flex fix');
