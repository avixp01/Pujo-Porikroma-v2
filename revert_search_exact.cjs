const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Revert renderSearchItem
const regex = /<div className="text-\[14px\] font-bold" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827', display: 'flex', alignItems: 'center', gap: '7px', width: '100%', minWidth: 0 \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center', flexShrink: 0 \}\}>\s*\{theme\.icon\}\s*<\/div>\s*<div className="truncate flex-1 min-w-0" style=\{\{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' \}\}>\s*\{loc\.name\}\s*<\/div>\s*<\/div>/g;

const oldDiv = `<div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {theme.icon}
                </div>
                {loc.name}
              </div>`;

if (regex.test(content)) {
    content = content.replace(regex, oldDiv);
    console.log("Successfully reverted renderSearchItem!");
} else {
    console.log("Could not find modified renderSearchItem!");
}

// 2. Revert the dropdown container
const dropdownRegex = /width: 'calc\(100% - 8px\)',\s*overflowX: 'hidden',/g;
const dropdownReplacement = `width: 'auto',`;

if (dropdownRegex.test(content)) {
    content = content.replace(dropdownRegex, dropdownReplacement);
    console.log("Successfully reverted dropdown container!");
} else {
    console.log("Could not find dropdown container!");
}

fs.writeFileSync(file, content, 'utf8');
