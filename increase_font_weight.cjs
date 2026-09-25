const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Increase weight of the title text
code = code.replace(
  /className="text-\[14px\] font-semibold truncate flex items-center gap-\[7px\]"/g,
  'className="text-[14px] font-bold truncate flex items-center gap-[7px]"'
);

// Increase weight of the distance text
code = code.replace(
  /className="text-\[13px\] font-bold" style=\{\{ color: theme\.color \}\}/g,
  'className="text-[13px] font-extrabold" style={{ color: theme.color }}'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Increased text width (font weight) for titles and distances.');
