const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /gap-1\.5/g,
  'gap-[7px]'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Increased gap between icon and text to 7px (gap-[7px]).');
