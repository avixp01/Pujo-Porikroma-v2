const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetSearchRegex = /const renderSearchItem = \(loc\) => \{[\s\S]*?return \([\s\S]*?className="px-5 py-2 flex items-center justify-between cursor-pointer"[\s\S]*?style=\{\{ borderBottom: '1px solid #f9fafb' \}\}[\s\S]*?onMouseDown=\{\(\) => handleSearchSelect\(loc\)\}[\s\S]*?>[\s\S]*?<div className="flex-1 min-w-0 pr-2">\s*<div className="text-\[14px\] font-semibold truncate flex items-center gap-1\.5" style=\{\{ color: '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center' \}\}>\s*\{theme\.icon\}\s*<\/div>\s*\{loc\.name\}\s*<\/div>\s*<div className="text-\[12px\] truncate" style=\{\{ color: '#6b7280', marginTop: '2px' \}\}>\s*\{categoryDisplay\}\s*<\/div>\s*<\/div>\s*\{distFormatted && \(\s*<div className="shrink-0 text-\[13px\]" style=\{\{ color: theme\.color \}\}>\s*\{distFormatted\}\s*<\/div>\s*\)\}\s*<\/div>\s*\);\s*\};/m;

const replacementSearch = `const renderSearchItem = (loc) => {
      const theme = getItemTheme(loc.type);
      const distStr = getDistString(loc.rawDist);
      const distFormatted = distStr ? distStr.replace(' away', '') : '';
      const categoryDisplay = loc.category ? \`\${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)} • \${loc.category}\` : loc.type;
  
      return (
        <div 
          key={loc.id} 
          className="px-5 py-3 flex items-center gap-4 cursor-pointer"
          style={{ borderBottom: '1px solid #f9fafb' }}
          onMouseDown={() => handleSearchSelect(loc)}
        >
          <div className="w-11 h-11 rounded-[12px] flex justify-center items-center shrink-0" style={{ backgroundColor: theme.bg, color: theme.color }}>
            {theme.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-bold truncate" style={{ color: '#111827' }}>{loc.name}</div>
            <div className="text-[12px] mt-0.5 truncate" style={{ color: '#6b7280', fontWeight: '500' }}>
              {categoryDisplay}
            </div>
          </div>
          {distFormatted && (
            <div className="flex flex-col items-end justify-center shrink-0 ml-2">
              <span className="text-[13px] font-bold leading-none" style={{ color: theme.color }}>{distFormatted}</span>
              <span className="text-[10px] text-gray-400 font-bold leading-none mt-[3px]">away</span>
            </div>
          )}
        </div>
      );
    };`;

code = code.replace(targetSearchRegex, replacementSearch);

const targetHomeRegex = /<div \s*className="px-5 py-2 flex items-center justify-between cursor-pointer"\s*style=\{\{ borderBottom: '1px solid #f9fafb' \}\}\s*onMouseDown=\{\(e\) => \{ e\.preventDefault\(\); if \(userLocation\) setMapCenter\(userLocation\); setIsSearchFocused\(false\); \}\}\s*>[\s\S]*?<div className="flex-1 min-w-0 pr-2">\s*<div className="text-\[14px\] font-semibold truncate flex items-center gap-1\.5" style=\{\{ color: '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center', color: '#9333ea' \}\}>\s*<Home size=\{16\} \/>\s*<\/div>\s*Home\s*<\/div>\s*<div className="text-\[12px\] truncate" style=\{\{ color: '#6b7280', marginTop: '2px' \}\}>\s*Saved home · \{homeAddress\}\s*<\/div>\s*<\/div>\s*<div className="shrink-0 text-\[13px\]" style=\{\{ color: '#9333ea' \}\}>\s*0 m\s*<\/div>\s*<\/div>/m;

const replacementHome = `<div 
                            className="px-5 py-3 flex items-center gap-4 cursor-pointer"
                            style={{ borderBottom: '1px solid #f9fafb' }}
                            onMouseDown={(e) => { e.preventDefault(); if (userLocation) setMapCenter(userLocation); setIsSearchFocused(false); }}
                          >
                            <div className="w-11 h-11 rounded-[12px] flex justify-center items-center shrink-0" style={{ backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#f3e8ff', color: '#9333ea' }}>
                              <Home size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[15px] font-bold truncate" style={{ color: '#111827' }}>Home</div>
                              <div className="text-[12px] mt-0.5 truncate" style={{ color: '#6b7280', fontWeight: '500' }}>
                                Saved home · {homeAddress}
                              </div>
                            </div>
                            <div className="flex flex-col items-end justify-center shrink-0 ml-2">
                              <span className="text-[13px] font-bold leading-none" style={{ color: '#9333ea' }}>0 m</span>
                              <span className="text-[10px] text-gray-400 font-bold leading-none mt-[3px]">away</span>
                            </div>
                          </div>`;

code = code.replace(targetHomeRegex, replacementHome);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Restored original search item layouts.');
