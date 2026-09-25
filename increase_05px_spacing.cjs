const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Remove hide-scrollbar
code = code.replace(
  'className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"',
  'className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"'
);

// 2. Add 8.5px padding
code = code.replace(
  /className="px-5 py-2 flex items-center justify-between cursor-pointer"\s+style=\{\{\s*borderBottom:\s*'1px solid #e5e7eb'\s*\}\}/g,
  'className="px-5 flex items-center justify-between cursor-pointer"\n            style={{ borderBottom: \'1px solid #e5e7eb\', paddingTop: \'8.5px\', paddingBottom: \'8.5px\' }}'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Increased spacing by 0.5px and removed hide-scrollbar.');
