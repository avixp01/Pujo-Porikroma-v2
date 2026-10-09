const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Revert renderSearchItem to original
const regex = /<div className="flex-1 min-w-0" style=\{\{ paddingRight: '3px' \}\}>[\s\S]*?<div className="text-\[14px\] font-bold" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827', display: 'flex', alignItems: 'center', gap: '7px', width: '100%', minWidth: 0 \}\}>[\s\S]*?<div style=\{\{ display: 'flex', alignItems: 'center', flexShrink: 0 \}\}>[\s\S]*?\{theme\.icon\}[\s\S]*?<\/div>[\s\S]*?<div className="truncate flex-1 min-w-0" style=\{\{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' \}\}>[\s\S]*?\{loc\.name\}[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<div className="text-\[12px\] truncate" style=\{\{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' \}\}>[\s\S]*?\{categoryDisplay\}[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?\{distFormatted && \([\s\S]*?<div className="shrink-0 flex flex-col items-end justify-center" style=\{\{ paddingRight: '3px' \}\}>/g;

const oldDiv = `<div className="flex-1 min-w-0 pr-2">
            <div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {theme.icon}
                </div>
                {loc.name}
              </div>
            <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' }}>
              {categoryDisplay}
            </div>
          </div>
          {distFormatted && (
              <div className="shrink-0 flex flex-col items-end justify-center">`;

if (regex.test(content)) {
    content = content.replace(regex, oldDiv);
    console.log("Successfully reverted renderSearchItem!");
} else {
    console.log("Could not find modified renderSearchItem!");
}

// 2. Revert the dropdown container to 'auto'
const dropdownRegex = /className="absolute top-full z-\[10001\] pointer-events-auto flex flex-col overflow-y-auto"[\s\S]*?style=\{\{[\s\S]*?left: '4px',[\s\S]*?right: '4px',[\s\S]*?width: 'calc\(100% - 8px\)',[\s\S]*?overflowX: 'hidden',/g;
const dropdownReplacement = `className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"
                style={{
                    left: '4px',
                    right: '4px',
                    width: 'auto',`;

if (dropdownRegex.test(content)) {
    content = content.replace(dropdownRegex, dropdownReplacement);
    console.log("Successfully reverted dropdown container!");
} else {
    console.log("Could not find dropdown container!");
}

fs.writeFileSync(file, content, 'utf8');
