const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Force the dropdown width and add overflow-x: hidden
const dropdownRegex = /className="absolute top-full z-\[10001\] pointer-events-auto flex flex-col overflow-y-auto"[\s\S]*?left: '4px',[\s\S]*?right: '4px',[\s\S]*?width: 'auto',/g;
const dropdownReplacement = `className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"
                style={{
                    left: '4px',
                    right: '4px',
                    width: 'calc(100% - 8px)',
                    overflowX: 'hidden',`;

if (dropdownRegex.test(content)) {
    content = content.replace(dropdownRegex, dropdownReplacement);
    console.log("Fixed dropdown container width.");
} else {
    console.log("Could not find dropdown regex.");
}

// 2. Fix the loc.name truncation by using a strict flex layout
const itemRegex = /<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center' \}\}>\s*\{theme\.icon\}\s*<\/div>\s*\{loc\.name\}\s*<\/div>/g;

const itemReplacement = `<div className="text-[14px] font-bold" style={{ color: isDarkMode ? '#d2b48c' : '#111827', display: 'flex', alignItems: 'center', gap: '7px', width: '100%', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    {theme.icon}
                  </div>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>
                    {loc.name}
                  </div>
                </div>`;

if (itemRegex.test(content)) {
    content = content.replace(itemRegex, itemReplacement);
    console.log("Fixed loc.name truncation.");
} else {
    console.log("Could not find item regex.");
}

fs.writeFileSync(file, content, 'utf8');
