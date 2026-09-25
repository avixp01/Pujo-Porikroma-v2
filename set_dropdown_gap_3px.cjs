const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// The current state is left: '4px', right: '4px' from the revert.
// We change it to left: '-13px', right: '-13px' for a 3px gap.
code = code.replace(
  "left: '4px',",
  "left: '-13px',"
);

code = code.replace(
  "right: '4px',",
  "right: '-13px',"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Set width to leave exactly 3px gap on both sides.');
