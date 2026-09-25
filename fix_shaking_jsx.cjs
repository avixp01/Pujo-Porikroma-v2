const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /<span style=\{\{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: '6px' \}\}>/,
  `<span style={{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: '6px', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Added hardware acceleration to arrow span");
