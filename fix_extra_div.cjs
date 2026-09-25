const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /\}\)\}\r?\n\s*<\/div>\r?\n\s*\}\)\r?\n\s*<\/div>\r?\n\s*<\/div>\r?\n\s*\{\/\* Filter Pills/;

code = code.replace(
  regex,
  ')}\n              </div>\n            )}\n          </div>\n\n          {/* Filter Pills'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed extra div.');
