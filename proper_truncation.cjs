const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center' \}\}>\s*\{theme\.icon\}\s*<\/div>\s*\{loc\.name\}\s*<\/div>/g;

const replacement = `<div className="text-[14px] font-bold flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {theme.icon}
                  </div>
                  <div className="truncate flex-1 min-w-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {loc.name}
                  </div>
                </div>`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Replaced loc.name with correct flex truncation wrapper.");
} else {
    console.log("Could not find the target string.");
}
