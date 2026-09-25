const fs = require('fs');
let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

mapPageCode = mapPageCode.replace(
  /<\/div>\s*\}\)\s*<\/div>\s*\{\/\* Filter Pills & Controls \*\/\}/,
  '</div>\n            )}\n            </div>\n          </div>\n\n          {/* Filter Pills & Controls */}'
);

fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
console.log('Fixed missing div with regex.');
