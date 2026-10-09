const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = /onClick=\{\(\) => \{\s*setIsRouteMenuOpen\(false\);\s*\}\}\s*>\s*Clear route\s*<\/button>/g;

const replaceStr = `onClick={() => {
                          setPlannedStops([]);
                          setIsRouteMenuOpen(false);
                        }}
                      >
                        Clear route
                      </button>`;

if (targetStr.test(code)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('Replaced successfully.');
} else {
  console.log('Target string not found!');
}
