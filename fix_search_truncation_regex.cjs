const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// There are multiple instances of this (one for Home, one for regular items)
const regex1 = /<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center' \}\}>\s*\{theme\.icon\}\s*<\/div>\s*\{loc\.name\}\s*<\/div>/g;

const replacement1 = `<div className="text-[14px] font-bold flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827', width: '100%', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {theme.icon}
                </div>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>{loc.name}</span>
              </div>`;

if (regex1.test(content)) {
    content = content.replace(regex1, replacement1);
    console.log("Replaced loc.name truncation.");
}

const regex2 = /<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center', color: '#9333ea' \}\}>\s*<Home size=\{16\} \/>\s*<\/div>\s*Back to home\s*<\/div>/g;

const replacement2 = `<div className="text-[14px] font-bold flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827', width: '100%', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', color: '#9333ea', flexShrink: 0 }}>
                  <Home size={16} />
                </div>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>Back to home</span>
              </div>`;

if (regex2.test(content)) {
    content = content.replace(regex2, replacement2);
    console.log("Replaced home truncation.");
}

fs.writeFileSync(file, content, 'utf8');
