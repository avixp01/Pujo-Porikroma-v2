const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetHomeRegex = /<div\s*className="px-5 py-3 flex items-center gap-4 cursor-pointer"[\s\S]*?onMouseDown=\{\(e\) => \{ e\.preventDefault\(\); if \(userLocation\) setMapCenter\(userLocation\); setIsSearchFocused\(false\); \}\}\s*>[\s\S]*?<div className="w-11 h-11 rounded-\[12px\] flex justify-center items-center shrink-0"[\s\S]*?<\/div>\s*<div className="flex-1 min-w-0">\s*<div className="text-\[15px\] font-bold truncate" style=\{\{ color: '#111827' \}\}>Home<\/div>\s*<div className="text-\[12px\] mt-0\.5 truncate" style=\{\{ color: '#6b7280', fontWeight: '500' \}\}>\s*Saved home · \{homeAddress\}\s*<\/div>\s*<\/div>\s*<div className="flex flex-col items-end justify-center shrink-0 ml-2">\s*<span className="text-\[13px\] font-bold leading-none" style=\{\{ color: '#9333ea' \}\}>0 m<\/span>\s*<span className="text-\[10px\] text-gray-400 font-bold leading-none mt-\[3px\]">away<\/span>\s*<\/div>\s*<\/div>/m;

const replacementHome = `<div 
                            className="px-5 py-2 flex items-center justify-between cursor-pointer"
                            style={{ borderBottom: '1px solid #f9fafb' }}
                            onMouseDown={(e) => { e.preventDefault(); if (userLocation) setMapCenter(userLocation); setIsSearchFocused(false); }}
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="text-[14px] font-semibold truncate flex items-center gap-1.5" style={{ color: '#111827' }}>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#9333ea' }}>
                                  <Home size={16} />
                                </div>
                                Home
                              </div>
                              <div className="text-[12px] truncate" style={{ color: '#6b7280', marginTop: '2px' }}>
                                Saved home · {homeAddress}
                              </div>
                            </div>
                            <div className="shrink-0 text-[13px]" style={{ color: '#9333ea' }}>
                              0 m
                            </div>
                          </div>`;

if (targetHomeRegex.test(code)) {
  code = code.replace(targetHomeRegex, replacementHome);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully updated Home item layout.');
} else {
  console.log('Regex did not match for Home item.');
}
