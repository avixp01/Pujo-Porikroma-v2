const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center' \}\}>\s*\{theme\.icon\}\s*<\/div>\s*\{loc\.name\}\s*<\/div>/g;

const newDiv = `<div className="text-[14px] font-bold" style={{ color: isDarkMode ? '#d2b48c' : '#111827', display: 'flex', alignItems: 'center', gap: '7px', width: '100%', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {theme.icon}
                </div>
                <div className="truncate flex-1 min-w-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {loc.name}
                </div>
              </div>`;

if (regex.test(content)) {
    content = content.replace(regex, newDiv);
    console.log("Successfully updated renderSearchItem!");
} else {
    console.log("Regex failed!");
}

fs.writeFileSync(file, content, 'utf8');
