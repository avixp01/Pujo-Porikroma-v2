const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  "color: '#9ca3af', marginBottom: '4px'",
  "color: '#9ca3af', marginTop: '-13px', marginBottom: '4px'"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Added negative top margin of -13px to uplift Matches Nearby.');
