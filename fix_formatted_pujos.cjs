const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
    /const formattedPujos = allPujos\.map\(\(p, index\) => \(\{\s*id: `pujo-\$\{index\}`,\s*type: 'pandal',\s*name: p\.name,\s*category: p\.category,\s*lat: p\.lat,\s*lng: p\.lng\s*\}\)\);/g,
    `const formattedPujos = allPujos.map((p, index) => ({
    id: \`pujo-\${index}\`,
    type: 'pandal',
    name: p.name,
    address: p.address,
    category: p.category,
    lat: p.lat,
    lng: p.lng
  }));`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully updated formattedPujos mapping to include address!');
