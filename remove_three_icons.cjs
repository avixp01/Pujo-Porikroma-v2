const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `                          <div className="flex px-5 py-2 gap-4" style={{ paddingBottom: '12px' }}>
                            <button className="text-sm font-semibold whitespace-nowrap flex items-center gap-1" style={{ color: isDarkMode ? '#f9fafb' : '#374151', background: 'none', border: 'none' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Pandal'); }}><img src="/pandel-icon.png" width="16" height="16" alt="pandal" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Pandals</button>
                            <button className="text-sm font-semibold whitespace-nowrap flex items-center gap-1" style={{ color: isDarkMode ? '#f9fafb' : '#374151', background: 'none', border: 'none' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Metro'); }}><img src="/metro-icon.png" width="16" height="16" alt="metro" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Metro</button>
                            <button className="text-sm font-semibold whitespace-nowrap flex items-center gap-1" style={{ color: isDarkMode ? '#f9fafb' : '#374151', background: 'none', border: 'none' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Toilet'); }}><img src="/toilet-icon.png" width="16" height="16" alt="toilet" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> Toilets</button>
                          </div>
`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, '');
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully removed the three-icon row.');
} else {
  console.log('Target string not found!');
}
