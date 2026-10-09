const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace preview-subtitle
code = code.replace(
    /\{selectedLocation\?\.address \|\| 'Kolkata, West Bengal'\}/g,
    `{selectedLocation?.address || (selectedLocation?.type === 'toilet' ? 'toilet' : 'Kolkata, West Bengal')}`
);

// Replace item-subtitle
code = code.replace(
    /\{loc\.address \|\| 'Kolkata, West Bengal'\}/g,
    `{loc.address || (loc.type === 'toilet' ? 'toilet' : 'Kolkata, West Bengal')}`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully updated toilet subtitle logic in MapPage.jsx!');
