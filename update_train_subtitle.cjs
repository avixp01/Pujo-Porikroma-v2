const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace preview-subtitle
code = code.replace(
    /\{selectedLocation\?\.address \|\| \(selectedLocation\?\.type === 'toilet' \? 'toilet' : selectedLocation\?\.type === 'metro' \? 'Metro Station' : 'Kolkata, West Bengal'\)\}/g,
    `{selectedLocation?.address || (selectedLocation?.type === 'toilet' ? 'toilet' : selectedLocation?.type === 'metro' ? 'Metro Station' : selectedLocation?.type === 'train' ? 'Train Station' : 'Kolkata, West Bengal')}`
);

// Replace item-subtitle
code = code.replace(
    /\{loc\.address \|\| \(loc\.type === 'toilet' \? 'toilet' : loc\.type === 'metro' \? 'Metro Station' : 'Kolkata, West Bengal'\)\}/g,
    `{loc.address || (loc.type === 'toilet' ? 'toilet' : loc.type === 'metro' ? 'Metro Station' : loc.type === 'train' ? 'Train Station' : 'Kolkata, West Bengal')}`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully updated train subtitle logic in MapPage.jsx!');
