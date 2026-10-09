const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// The original search item has this exact line:
// <div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
const oldDiv = `<div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {theme.icon}
                </div>
                {loc.name}
              </div>`;

const newDiv = `<div className="text-[14px] font-bold" style={{ color: isDarkMode ? '#d2b48c' : '#111827', display: 'flex', alignItems: 'center', gap: '7px', width: '100%', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {theme.icon}
                </div>
                <div className="truncate flex-1 min-w-0" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {loc.name}
                </div>
              </div>`;

if (content.includes(oldDiv)) {
    content = content.replace(oldDiv, newDiv);
    console.log("Successfully updated renderSearchItem!");
} else {
    console.log("Could not find oldDiv!");
}

// Ensure the dropdown is constrained
const dropdownOld = `className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"\n                style={{\n                    left: '4px',\n                    right: '4px',\n                    width: 'auto',`;
const dropdownNew = `className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"\n                style={{\n                    left: '4px',\n                    right: '4px',\n                    width: 'calc(100% - 8px)',\n                    overflowX: 'hidden',`;

if (content.includes(dropdownOld)) {
    content = content.replace(dropdownOld, dropdownNew);
    console.log("Successfully updated dropdown container!");
} else {
    console.log("Could not find dropdownOld!");
}

fs.writeFileSync(file, content, 'utf8');
