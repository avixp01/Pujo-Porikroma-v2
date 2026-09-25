const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const startStr = "// pujos-part1.js - Bonedi Baris & North Kolkata Batch 1";
const endStr = "// Helper to create custom HTML markers";

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    const newData = `import { allPujos } from '../data/allPujos.js';
import { allToilets } from '../data/toiletsManager.js';
import { allMetros } from '../data/metroManager.js';
import { allTrains } from '../data/trainManager.js';

console.log(\`Successfully loaded \${allPujos.length} unique pandals!\`);

const formattedPujos = allPujos.map((p, index) => ({
  id: \`pujo-\${index}\`,
  type: 'pandal',
  name: p.name,
  category: p.category,
  lat: p.lat,
  lng: p.lng
}));

const formattedToilets = allToilets.map((t, index) => ({
  id: \`toilet-\${index}\`,
  type: 'toilet',
  name: t.name || 'Public Toilet',
  lat: t.lat,
  lng: t.lng
}));

const formattedMetros = allMetros.map((m, index) => ({
  id: \`metro-\${index}\`,
  type: 'metro',
  name: m.name,
  lat: m.lat,
  lng: m.lng
}));

const formattedTrains = allTrains.map((tr, index) => ({
  id: \`train-\${index}\`,
  type: 'train',
  name: tr.name,
  lat: tr.lat,
  lng: tr.lng
}));

const locationData = [
  ...formattedPujos,
  ...formattedToilets,
  ...formattedMetros,
  ...formattedTrains
];

`;

    code = code.substring(0, startIndex) + newData + code.substring(endIndex);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Restored data successfully!");
} else {
    console.log("Failed to find start or end strings.");
}
