const fs = require('fs');
const file = 'src/components/SettingsPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="settings-journey-cards">[\s\S]*?<div className="settings-journey-card">[\s\S]*?<Home size=\{20\} \/>[\s\S]*?<\/div>[\s\S]*?<div className="settings-journey-stats">[\s\S]*?<span className="settings-stat-number">0<\/span>[\s\S]*?<span className="settings-stat-label">Visited<\/span>[\s\S]*?<\/div>[\s\S]*?<\/div>\s*<div className="settings-journey-divider"><\/div>\s*<div className="settings-journey-card" style=\{\{ cursor: 'pointer' \}\}>\s*<span style=\{\{ color: '#d97706', fontWeight: 'bold', fontSize: '16px', letterSpacing: '0\.5px' \}\}>view<\/span>\s*<\/div>\s*<\/div>/g;

const replaceStr = `<div className="settings-journey-cards" style={{ padding: '20px 24px', justifyContent: 'space-between' }}>
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

if (regex.test(content)) {
    content = content.replace(regex, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully updated journey cards with regex!");
} else {
    console.log("Could not find target string with regex.");
}
