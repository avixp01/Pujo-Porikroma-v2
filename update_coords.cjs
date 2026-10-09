const fs = require('fs');
let code = fs.readFileSync('src/data/pujo-batch5.js', 'utf8');

code = code.replace(
    /\{ name: "14 Pally Udayan Sangha", address: "Entally", category: "Pujo", lat: 22\.5630, lng: 88\.3760 \}/g,
    '{ name: "14 Pally Udayan Sangha", address: "Entally", category: "Pujo", lat: 22.5580, lng: 88.3653 }'
);

fs.writeFileSync('src/data/pujo-batch5.js', code, 'utf8');
console.log('Coordinates updated successfully!');
