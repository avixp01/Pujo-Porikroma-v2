const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetRegex = /\{poorAccuracy && \(\s*<div className="px-5 pb-3 pt-1">\s*<button[\s\S]*?Poor GPS signal\. Tap to force refresh\.[\s\S]*?<\/button>\s*<\/div>\s*\)\}/;

if (targetRegex.test(code)) {
  code = code.replace(targetRegex, '');
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully removed the duplicate poor GPS warning from the search list!');
} else {
  console.log('Could not find the duplicate poor GPS warning in the search list!');
}
