const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `{allPujos.slice(0, 4).map(loc => renderSearchItem({...loc, rawDist: Infinity}))}`;
const replacementStr = `{formattedPujos.slice(0, 4).map(loc => renderSearchItem({...loc, rawDist: Infinity}))}`;

if (mapPageCode.includes(targetStr)) {
  mapPageCode = mapPageCode.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
  console.log('Successfully fixed the crash by using formattedPujos.');
} else {
  console.log('Target string not found!');
}
