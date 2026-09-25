const fs = require('fs');
let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetButtons = [
  { search: "bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2\" onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Pandal'); }}><img src=\"/pandel-icon.png\"", replace: "rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2\" style={{ backgroundColor: isDarkMode ? '#3a2e29' : '#f3f4f6', color: isDarkMode ? '#f9fafb' : '#374151' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Pandal'); }}><img src=\"/pandel-icon.png\"" },
  { search: "bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2\" onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Metro'); }}><img src=\"/metro-icon.png\"", replace: "rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2\" style={{ backgroundColor: isDarkMode ? '#3a2e29' : '#f3f4f6', color: isDarkMode ? '#f9fafb' : '#374151' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Metro'); }}><img src=\"/metro-icon.png\"" },
  { search: "bg-gray-100 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2\" onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Toilet'); }}><img src=\"/toilet-icon.png\"", replace: "rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2\" style={{ backgroundColor: isDarkMode ? '#3a2e29' : '#f3f4f6', color: isDarkMode ? '#f9fafb' : '#374151' }} onMouseDown={(e) => { e.preventDefault(); setSearchQuery('Toilet'); }}><img src=\"/toilet-icon.png\"" },
];

targetButtons.forEach(btn => {
  mapPageCode = mapPageCode.replace(btn.search, btn.replace);
});

fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
console.log('Fixed styling for trending buttons');
