const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Target the renderSearchItem function block
const targetRegex = /const renderSearchItem = \(loc\) => \{[\s\S]*?return \([\s\S]*?className="px-5 py-3 flex items-center gap-4 cursor-pointer"[\s\S]*?style=\{\{ borderBottom: '1px solid #f9fafb' \}\}[\s\S]*?onMouseDown=\{\(\) => handleSearchSelect\(loc\)\}[\s\S]*?>[\s\S]*?<div className="w-11 h-11 rounded-\[12px\] flex justify-center items-center shrink-0"[\s\S]*?<\/div>\s*<div className="flex-1 min-w-0">\s*<div className="text-\[15px\] font-bold truncate" style=\{\{ color: '#111827' \}\}>\{loc\.name\}<\/div>\s*<div className="text-\[12px\] mt-0\.5 truncate" style=\{\{ color: '#6b7280', fontWeight: '500' \}\}>\s*\{categoryDisplay\}\s*<\/div>\s*<\/div>\s*\{distFormatted && \(\s*<div className="flex flex-col items-end justify-center shrink-0 ml-2">\s*<span className="text-\[13px\] font-bold leading-none" style=\{\{ color: theme\.color \}\}>\{distFormatted\}<\/span>\s*<span className="text-\[10px\] text-gray-400 font-bold leading-none mt-\[3px\]">away<\/span>\s*<\/div>\s*\)\}\s*<\/div>\s*\);\s*\};/m;

const replacement = `const renderSearchItem = (loc) => {
      const theme = getItemTheme(loc.type);
      const distStr = getDistString(loc.rawDist);
      const distFormatted = distStr ? distStr.replace(' away', '') : '';
      const categoryDisplay = loc.category ? \`\${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)} • \${loc.category}\` : loc.type;
  
      return (
        <div 
          key={loc.id} 
          className="px-5 py-2 flex items-center justify-between cursor-pointer"
          style={{ borderBottom: '1px solid #f9fafb' }}
          onMouseDown={() => handleSearchSelect(loc)}
        >
          <div className="flex-1 min-w-0 pr-2">
            <div className="text-[14px] font-semibold truncate flex items-center gap-1.5" style={{ color: '#111827' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {theme.icon}
              </div>
              {loc.name}
            </div>
            <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px' }}>
              {categoryDisplay}
            </div>
          </div>
          {distFormatted && (
            <div className="shrink-0 text-[13px]" style={{ color: theme.color }}>
              {distFormatted}
            </div>
          )}
        </div>
      );
    };`;

if (targetRegex.test(code)) {
  code = code.replace(targetRegex, replacement);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully updated renderSearchItem layout.');
} else {
  console.log('Regex did not match. Trying manual replace...');
  // Let's try replacing just the JSX part
}
