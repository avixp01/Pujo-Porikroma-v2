const fs = require('fs');
let code = fs.readFileSync('src/components/LoginModal.jsx', 'utf8');

const searchText = `Check Email\n              </button>\n            </div>\n          )}`;
const replaceText = `Enter Code\n              </button>\n            </div>\n          )}`;

code = code.replace(searchText, replaceText);

fs.writeFileSync('src/components/LoginModal.jsx', code, 'utf8');
console.log('Replaced button text successfully');
