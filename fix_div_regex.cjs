const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2\.5"><polyline points="9 18 15 12 9 6"><\/polyline><\/svg>\s*<\/button>\s*<\/div>/;

if (regex.test(code)) {
  code = code.replace(regex, `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                  </div>
                </div>`);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done regex');
} else {
  console.log('not found');
}
