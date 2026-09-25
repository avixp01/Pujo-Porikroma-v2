const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace the hardcoded #111827 color with a conditional isDarkMode ? '#d2b48c' : '#111827' 
// for the dropdown item titles. 
// #d2b48c is a nice light brown (tan) color that will be visible in dark mode.

code = code.replace(
  /<div className="text-\[14px\] font-semibold truncate flex items-center gap-1\.5" style=\{\{ color: '#111827' \}\}>/g,
  '<div className="text-[14px] font-semibold truncate flex items-center gap-1.5" style={{ color: isDarkMode ? \'#d2b48c\' : \'#111827\' }}>'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Updated pandal title color to light brown in dark mode.');
