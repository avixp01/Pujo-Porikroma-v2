const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  'className="absolute top-full left-0 right-0 mt-2 z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"',
  'className="absolute top-full mt-2 z-[10001] pointer-events-auto flex flex-col overflow-y-auto hide-scrollbar"'
);

code = code.replace(
  "backgroundColor: '#ffffff',\n                  opacity: 1,",
  "left: '-20px',\n                  right: '-20px',\n                  backgroundColor: '#ffffff',\n                  opacity: 1,"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Stretched dropdown by 20px.');
