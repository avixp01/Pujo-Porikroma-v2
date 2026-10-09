const fs = require('fs');

const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const renderSearchItem = \(loc\) => \{[\s\S]*?return \([\s\S]*?<div className="flex-1 min-w-0 pr-2">[\s\S]*?<\/div>\s*\{distFormatted && \([\s\S]*?<\/div>\s*\)\s*\}\s*<\/div>\s*\);\s*\};\s*const renderOriginObj/g;

const originalCode = `const renderSearchItem = (loc) => {
      const theme = getItemTheme(loc.type);
      const distStr = getDistString(loc.rawDist);
      let distFormatted = distStr ? distStr.replace(' away', '') : '';
        if (!distFormatted) {
          const pseudoRandom = Math.floor((loc.lat + loc.lng) * 100000) % 950 + 50;
          distFormatted = pseudoRandom < 1000 ? \`\${pseudoRandom} m\` : \`\${(pseudoRandom / 1000).toFixed(1)} km\`;
        }
      const categoryDisplay = loc.category ? \`\${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)} • \${loc.category}\` : loc.type;
  
      return (
        <div 
          key={loc.id} 
          className="px-5 flex items-center justify-between cursor-pointer"
            style={{ borderBottom: '1px solid #e5e7eb', paddingTop: '7px', paddingBottom: '7px' }}
          onMouseDown={() => handleSearchSelect(loc)}
        >
          <div className="flex-1 min-w-0 pr-2">
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
              <div className="shrink-0 flex flex-col items-end justify-center">
                <div className="text-[13px] font-extrabold" style={{ color: theme.color }}>{distFormatted}</div>
                <div className="text-[10px]" style={{ color: '#9ca3af', marginTop: '-2px' }}>away</div>
              </div>
            )}
        </div>
      );
    };

    const renderOriginObj`;

if (regex.test(content)) {
    content = content.replace(regex, originalCode);
    console.log("Successfully reverted renderSearchItem.");
} else {
    console.log("Could not find renderSearchItem.");
}

// Revert the dropdown width and overflowX
const dropdownRegex = /className="absolute top-full z-\[10001\] pointer-events-auto flex flex-col overflow-y-auto"[\s\S]*?style=\{\{[\s\S]*?left: '4px',[\s\S]*?right: '4px',[\s\S]*?width: 'calc\(100% - 8px\)',[\s\S]*?overflowX: 'hidden',/g;
const dropdownReplacement = `className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"
                style={{
                    left: '4px',
                    right: '4px',
                    width: 'auto',`;

if (dropdownRegex.test(content)) {
    content = content.replace(dropdownRegex, dropdownReplacement);
    console.log("Successfully reverted dropdown container.");
} else {
    console.log("Could not find dropdown container.");
}

fs.writeFileSync(file, content, 'utf8');
