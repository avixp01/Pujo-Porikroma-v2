const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `      {/* Bottom Sheet */}
      <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', boxShadow: '0 -4px 16px rgba(0,0,0,0.1)', zIndex: 10 }}>
        <div style={{ backgroundColor: '#1f2937', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', color: 'white', width: '180px' }}>
          <div style={{ backgroundColor: '#374151', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Head out</div>
            <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '2px' }}>In 0 m</div>
          </div>
        </div>`;

const replaceStr = `      {/* Bottom Sheet */}
      <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', zIndex: 10, margin: '0 16px 24px 16px', borderRadius: '24px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#7c2d12', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', color: 'white', width: '180px' }}>
          <div style={{ backgroundColor: '#fef3c7', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>Head out</div>
            <div style={{ fontSize: '14px', color: '#fed7aa', marginTop: '2px' }}>In 0 m</div>
          </div>
        </div>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully styled the bottom sheet!");
} else {
    console.log("Could not find the target string!");
}
