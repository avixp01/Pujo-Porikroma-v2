const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Put hide-scrollbar back
code = code.replace(
  'className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto"',
  'className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"'
);

// 2. Revert the list items spacing
code = code.replace(
  /className="px-5 flex items-center justify-between cursor-pointer"\s+style=\{\{\s*borderBottom:\s*'1px solid #e5e7eb',\s*paddingTop:\s*'11px',\s*paddingBottom:\s*'11px'\s*\}\}/g,
  'className="px-5 py-2 flex items-center justify-between cursor-pointer"\n            style={{ borderBottom: \'1px solid #e5e7eb\' }}'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Reverted to the state before the first spacing command.');
