const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const t5 = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>`;
const r5 = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c2d12" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                  </div>
                </div>`;

const safeReplace = (targetStr, replaceStr) => {
  const targetLF = targetStr.replace(/\r\n/g, '\n');
  const replaceLF = replaceStr.replace(/\r\n/g, '\n');
  if (code.includes(targetStr)) {
    code = code.replace(targetStr, replaceStr);
    console.log('done CRLF');
  } else if (code.includes(targetLF)) {
    code = code.replace(targetLF, replaceLF);
    console.log('done LF');
  } else {
    console.log('not found');
  }
};

safeReplace(t5, r5);
fs.writeFileSync('src/components/MapPage.jsx', code);
