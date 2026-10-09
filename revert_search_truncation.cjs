const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Revert loc.name
const regex1 = /<div className="text-\[14px\] font-bold flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827', width: '100%', minWidth: 0 \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center', flexShrink: 0 \}\}>\s*\{theme\.icon\}\s*<\/div>\s*<div style=\{\{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 \}\}>\{loc\.name\}<\/div>\s*<\/div>/g;

const replacement1 = `<div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {theme.icon}
                </div>
                {loc.name}
              </div>`;

if (regex1.test(content)) {
    content = content.replace(regex1, replacement1);
    console.log("Reverted loc.name layout.");
} else {
    console.log("Could not find modified loc.name layout.");
}

// Revert Home
const regex2 = /<div className="text-\[14px\] font-bold flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827', width: '100%', minWidth: 0 \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center', color: '#9333ea', flexShrink: 0 \}\}>\s*<Home size=\{16\} \/>\s*<\/div>\s*<div style=\{\{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 \}\}>Back to home<\/div>\s*<\/div>/g;

const replacement2 = `<div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', color: '#9333ea' }}>
                                    <Home size={16} />
                                  </div>
                                  Back to home
                                </div>`;

if (regex2.test(content)) {
    content = content.replace(regex2, replacement2);
    console.log("Reverted home layout.");
}

// Revert dropdown overflowX
const regexDropdown = /padding: '16px 13px',\s*maxHeight: '65vh',\s*overflowX: 'hidden'/g;
const replaceDropdown = `padding: '16px 13px',\n                  maxHeight: '65vh'`;

if (regexDropdown.test(content)) {
    content = content.replace(regexDropdown, replaceDropdown);
    console.log("Reverted dropdown overflowX.");
}

fs.writeFileSync(file, content, 'utf8');
