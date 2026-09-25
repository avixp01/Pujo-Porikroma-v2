const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Remove hide-scrollbar from the dropdown container to show the scrollbar slider
code = code.replace(
  /className="absolute top-full z-\[10001\] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"/g,
  'className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"'
);

// 2. Increase vertical spacing of items by 3px (from 8px/py-2 to 11px)
// We remove py-2 and add inline padding
code = code.replace(
  /className="px-5 py-2 flex items-center justify-between cursor-pointer"\s+style=\{\{\s*borderBottom:\s*'1px solid #e5e7eb'\s*\}\}/g,
  'className="px-5 flex items-center justify-between cursor-pointer"\n            style={{ borderBottom: \'1px solid #e5e7eb\', paddingTop: \'11px\', paddingBottom: \'11px\' }}'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Updated item spacing and showed scrollbar.');
