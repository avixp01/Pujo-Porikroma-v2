const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const homeRegex = /<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center', color: '#9333ea' \}\}>\s*<Home size=\{16\} \/>\s*<\/div>\s*Back to home\s*<\/div>/g;

const homeReplacement = `<div className="text-[14px] font-bold" style={{ color: isDarkMode ? '#d2b48c' : '#111827', display: 'flex', alignItems: 'center', gap: '7px', width: '100%', minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', color: '#9333ea', flexShrink: 0 }}>
                                    <Home size={16} />
                                  </div>
                                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>
                                    Back to home
                                  </div>
                                </div>`;

if (homeRegex.test(content)) {
    content = content.replace(homeRegex, homeReplacement);
    console.log("Successfully replaced Back to home layout.");
} else {
    console.log("Could not find Back to home.");
}

fs.writeFileSync(file, content, 'utf8');
