const fs = require('fs');
const file = 'src/components/SettingsPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `              <div className="settings-journey-cards">
                <div className="settings-journey-card">
                  <div className="settings-journey-icon-wrap">
                    <Home size={20} />
                  </div>
                  <div className="settings-journey-stats">
                    <span className="settings-stat-number">0</span>
                    <span className="settings-stat-label">Visited</span>
                  </div>
                </div>
                <div className="settings-journey-divider"></div>
                <div className="settings-journey-card" style={{ cursor: 'pointer' }}>
                  <span style={{ color: '#d97706', fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>view</span>
                </div>
              </div>`;

const replaceStr = `              <div className="settings-journey-cards" style={{ padding: '20px 24px', justifyContent: 'space-between' }}>
                <div className="settings-journey-card" style={{ flex: 'none', justifyContent: 'flex-start', marginLeft: '8px' }}>
                  <div className="settings-journey-icon-wrap">
                    <Home size={20} />
                  </div>
                  <div className="settings-journey-stats">
                    <span className="settings-stat-number">0</span>
                    <span className="settings-stat-label">Visited</span>
                  </div>
                </div>
                
                <div className="settings-journey-card" style={{ flex: 'none', justifyContent: 'flex-end', cursor: 'pointer', marginRight: '8px' }}>
                  <span style={{ color: '#b45309', fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>view</span>
                </div>
              </div>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully updated journey cards!");
} else {
    console.log("Could not find target string.");
}
