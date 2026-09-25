const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

mapPageCode = mapPageCode.replace(/Saved home.*?\{homeAddress\}/g, 'Saved home · {homeAddress}');

fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
console.log('Fixed middle dot.');
