const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// replace first one
const t1 = 'Tonight • 0 stops planned';
const r1 = '0 stops planned';
code = code.replace(t1, r1);

// replace second one
const t2 = 'Tonight • {plannedStops.length} stops planned';
const r2 = '{plannedStops.length} stops planned';
code = code.replace(t2, r2);

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done removing tonight');
