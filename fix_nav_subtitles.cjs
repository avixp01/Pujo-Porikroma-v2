const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace item-subtitle in direction list (which uses activeDirectionMode)
code = code.replace(
    /\{loc\.address \|\| \(loc\.type === 'toilet' \? 'toilet' : loc\.type === 'metro' \? 'Metro Station' : loc\.type === 'train' \? 'Train Station' : 'Kolkata, West Bengal'\)\}/g,
    `{loc.address || (activeDirectionMode === 'bike' ? 'Toilet' : activeDirectionMode === 'train' ? 'Metro Station' : activeDirectionMode === 'footprints' ? 'Train Station' : 'Kolkata, West Bengal')}`
);

// Replace preview-subtitle (capitalization fix)
code = code.replace(
    /\{selectedLocation\?\.address \|\| \(selectedLocation\?\.type === 'toilet' \? 'toilet' : selectedLocation\?\.type === 'metro' \? 'Metro Station' : selectedLocation\?\.type === 'train' \? 'Train Station' : 'Kolkata, West Bengal'\)\}/g,
    `{selectedLocation?.address || (selectedLocation?.type === 'toilet' ? 'Toilet' : selectedLocation?.type === 'metro' ? 'Metro Station' : selectedLocation?.type === 'train' ? 'Train Station' : 'Kolkata, West Bengal')}`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully updated subtitles based on activeDirectionMode!');
