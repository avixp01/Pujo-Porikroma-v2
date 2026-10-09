const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `<div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {theme.icon}
                </div>
                {loc.name}
              </div>`;
              
const replaceStr = `<div className="text-[14px] font-bold flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {theme.icon}
                </div>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{loc.name}</span>
              </div>`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully fixed text truncation for search recommendations.");
} else {
    console.log("Could not find the target search item layout.");
}
