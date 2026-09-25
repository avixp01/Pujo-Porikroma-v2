const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `alt="train mode" /></button>
              )}
            </div>`;

const replacement = `alt="train mode" /></button>
            </div>`;

code = code.replace(target, replacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully removed stray bracket in direction-modes");
