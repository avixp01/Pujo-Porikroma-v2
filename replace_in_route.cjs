const fs = require('fs');
const file = 'src/components/SettingsPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `                <div className="settings-journey-card">
                  <div className="settings-journey-icon-wrap alt-icon">
                    <Navigation size={20} />
                  </div>
                  <div className="settings-journey-stats">
                    <span className="settings-stat-number">0</span>
                    <span className="settings-stat-label">In route</span>
                  </div>
                </div>`;

const replaceStr = `                <div className="settings-journey-card" style={{ cursor: 'pointer' }}>
                  <span style={{ color: '#d97706', fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>view</span>
                </div>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully replaced In route with view!");
} else {
    console.log("Could not find target string.");
}
