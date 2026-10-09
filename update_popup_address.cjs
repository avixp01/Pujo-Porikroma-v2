const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
    /<p className="preview-subtitle">Ballygunge Place, Ballygunge<\/p>/g,
    `<p className="preview-subtitle">{selectedLocation?.address || 'Kolkata, West Bengal'}</p>`
);

code = code.replace(
    /\{selectedLocation\?\.address \|\| 'Ballygunge Place, Ballygunge'\}/g,
    `{selectedLocation?.address || 'Kolkata, West Bengal'}`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully updated addresses in MapPage.jsx!');
