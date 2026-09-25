const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = '          )}\r\n        </div>\r\n\r\n        {/* Filter Pills';
const replacement = '          )}\r\n          </div>\r\n        </div>\r\n\r\n        {/* Filter Pills';

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully fixed syntax error! Used CRLF.');
} else {
  console.log('Still not found.');
}
