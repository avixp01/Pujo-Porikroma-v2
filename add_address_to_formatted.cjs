const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// formattedPujos
const pujosRegex = /const formattedPujos = allPujos\.map\(\(p, index\) => \(\{\s*id: `pujo-\$\{index\}`,\s*type: 'pandal',\s*name: p\.name,\s*category: p\.category,\s*lat: p\.lat,\s*lng: p\.lng\s*\}\)\);/;
const pujosNew = `const formattedPujos = allPujos.map((p, index) => ({
    id: \`pujo-\${index}\`,
    type: 'pandal',
    name: p.name,
    category: p.category,
    address: p.address,
    lat: p.lat,
    lng: p.lng
  }));`;

if (pujosRegex.test(content)) {
    content = content.replace(pujosRegex, pujosNew);
    console.log("Updated formattedPujos");
}

// formattedToilets
const toiletsRegex = /const formattedToilets = allToilets\.map\(\(t, index\) => \(\{\s*id: `toilet-\$\{index\}`,\s*type: 'toilet',\s*name: t\.name,\s*lat: t\.lat,\s*lng: t\.lng\s*\}\)\);/;
const toiletsNew = `const formattedToilets = allToilets.map((t, index) => ({
    id: \`toilet-\${index}\`,
    type: 'toilet',
    name: t.name,
    address: t.address,
    lat: t.lat,
    lng: t.lng
  }));`;

if (toiletsRegex.test(content)) {
    content = content.replace(toiletsRegex, toiletsNew);
    console.log("Updated formattedToilets");
}

// formattedMetros
const metrosRegex = /const formattedMetros = allMetros\.map\(\(m, index\) => \(\{\s*id: `metro-\$\{index\}`,\s*type: 'metro',\s*name: m\.name,\s*lat: m\.lat,\s*lng: m\.lng\s*\}\)\);/;
const metrosNew = `const formattedMetros = allMetros.map((m, index) => ({
    id: \`metro-\${index}\`,
    type: 'metro',
    name: m.name,
    address: m.address,
    lat: m.lat,
    lng: m.lng
  }));`;

if (metrosRegex.test(content)) {
    content = content.replace(metrosRegex, metrosNew);
    console.log("Updated formattedMetros");
}

// formattedTrains
const trainsRegex = /const formattedTrains = allTrains\.map\(\(t, index\) => \(\{\s*id: `train-\$\{index\}`,\s*type: 'train',\s*name: t\.name,\s*lat: t\.lat,\s*lng: t\.lng\s*\}\)\);/;
const trainsNew = `const formattedTrains = allTrains.map((t, index) => ({
    id: \`train-\${index}\`,
    type: 'train',
    name: t.name,
    address: t.address,
    lat: t.lat,
    lng: t.lng
  }));`;

if (trainsRegex.test(content)) {
    content = content.replace(trainsRegex, trainsNew);
    console.log("Updated formattedTrains");
}

fs.writeFileSync(file, content, 'utf8');
