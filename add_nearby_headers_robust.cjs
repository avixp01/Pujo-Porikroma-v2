const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace for LOCATION OFF
const locOffRegex = /(\/\/\s*LOCATION OFF:\s*TRENDING CATEGORIES\s*<>\s*)(\{formattedPujos\.slice)/g;
code = code.replace(locOffRegex, '$1<div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">NEARBY</div>\n                          $2');

// Replace for LOCATION ON
const locOnRegex = /(<\/div>\s*\)\s*\}\s*)(\{nearbySearchList\.length\s*>\s*0\s*\?\s*\()/g;
code = code.replace(locOnRegex, '$1<div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400">NEARBY</div>\n                          $2');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Added NEARBY headers robustly.');
