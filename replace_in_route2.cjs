const fs = require('fs');
const file = 'src/components/SettingsPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="settings-journey-card">\s*<div className="settings-journey-icon-wrap alt-icon">\s*<Navigation size=\{20\} \/>\s*<\/div>\s*<div className="settings-journey-stats">\s*<span className="settings-stat-number">0<\/span>\s*<span className="settings-stat-label">In route<\/span>\s*<\/div>\s*<\/div>/g;

const replaceStr = `<div className="settings-journey-card" style={{ cursor: 'pointer' }}>
                  <span style={{ color: '#d97706', fontWeight: 'bold', fontSize: '16px', letterSpacing: '0.5px' }}>view</span>
                </div>`;

if (regex.test(content)) {
    content = content.replace(regex, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully replaced In route with view!");
} else {
    console.log("Could not find target string.");
}
