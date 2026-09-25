const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Replace data block
const startStr = '// pujos-part1.js - Bonedi Baris & North Kolkata Batch 1';
const endStr = '// Format the new data and combine with some sample metro/toilet data';
const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = "import { allPujos } from '../data/allPujos.js';\n" +
                        "import { allToilets } from '../data/toiletsManager.js';\n" +
                        "import { allMetros } from '../data/metroManager.js';\n\n" + endStr;
    code = code.slice(0, startIdx) + replacement + code.slice(endIdx + endStr.length);
}

// 2. Add formattedToilets, formattedMetros, and replace locationData
const targetLoc = 'const locationData = [';
const replaceLoc = `const formattedToilets = allToilets.map((t, index) => ({
  id: \`toilet-\${index}\`,
  type: 'toilet',
  name: t.name,
  category: t.category,
  lat: t.lat,
  lng: t.lng
}));

const formattedMetros = allMetros.map((m, index) => ({
  id: \`metro-\${index}\`,
  type: 'metro',
  name: m.name,
  category: m.category,
  lat: m.lat,
  lng: m.lng
}));

const locationData = [
  ...formattedToilets,
  ...formattedMetros,
`;
code = code.replace(targetLoc, replaceLoc);

// 3. Fix setMapZoom
code = code.replace(/setMapZoom\(16\);/g, 'setMapZoom(18);');

// 4. Fix MarkerClusterGroup
const targetCluster = '<MarkerClusterGroup chunkedLoading key={isDarkMode ? \'cluster-dark\' : \'cluster-light\'}>';
const replaceCluster = '<MarkerClusterGroup \n            chunkedLoading \n            key={isDarkMode ? \'cluster-dark\' : \'cluster-light\'}\n            disableClusteringAtZoom={17}\n            maxClusterRadius={40}\n          >';
code = code.replace(targetCluster, replaceCluster);

// 5. Add console.log fix
const targetLog = 'const formattedPujos = allPujos.map((p, index) => ({';
const replaceLog = 'console.log(`Successfully loaded ${allPujos.length} unique pandals!`);\n\nconst formattedPujos = allPujos.map((p, index) => ({';
code = code.replace(targetLog, replaceLog);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Restored and updated MapPage.jsx!');
