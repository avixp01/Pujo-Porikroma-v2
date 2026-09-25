const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace the class without mt-2
code = code.replace(
  'className="absolute top-full mt-2 z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"',
  'className="absolute top-full z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"'
);

// Add marginTop: '5px' to the inline styles
code = code.replace(
  "width: 'auto',",
  "width: 'auto',\n                  marginTop: '5px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set gap between search bar and dropdown to exactly 5px.');
