const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// I will extract everything between `const renderSearchItem = (loc) => {` and `return (` and then the return block.
// To be safe, I'll use a regex that matches the whole return block inside renderSearchItem.
const searchItemRegex = /return \([\s\S]*?<div className="text-\[14px\] font-bold[^>]*>[\s\S]*?\{theme\.icon\}[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<div className="text-\[12px\] truncate"[^>]*>[\s\S]*?\{categoryDisplay\}[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?\{distFormatted && \([\s\S]*?<\/div>\s*\)\s*\}\s*<\/div>\s*\);/g;

const perfectReturn = `return (
          <div 
            key={loc.id} 
            className="px-5 flex items-center justify-between cursor-pointer"
              style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '7px', paddingBottom: '7px' }}
            onMouseDown={() => handleSearchSelect(loc)}
          >
            <div className="flex-1 min-w-0 pr-2">
              <div className="text-[14px] font-bold" style={{ color: isDarkMode ? '#d2b48c' : '#111827', display: 'flex', alignItems: 'center', gap: '7px', width: '100%', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  {theme.icon}
                </div>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, minWidth: 0 }}>
                  {loc.name}
                </div>
              </div>
              <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' }}>
                {categoryDisplay}
              </div>
            </div>
            {distFormatted && (
                <div className="shrink-0 flex flex-col items-end justify-center">
                  <div className="text-[13px] font-extrabold" style={{ color: theme.color }}>{distFormatted}</div>
                  <div className="text-[10px]" style={{ color: '#9ca3af', marginTop: '-2px' }}>away</div>
                </div>
              )}
          </div>
        );`;

if (searchItemRegex.test(content)) {
    content = content.replace(searchItemRegex, perfectReturn);
    console.log("Successfully replaced renderSearchItem return block.");
} else {
    console.log("Could not find the return block.");
}

fs.writeFileSync(file, content, 'utf8');
