const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Main popup
const mainRegex = /<p className="preview-subtitle">Ballygunge Place, Ballygunge<\/p>/g;
const mainReplacement = `<p className="preview-subtitle">{selectedLocation?.address || (selectedLocation?.type === 'toilet' ? 'Toilet' : selectedLocation?.type === 'metro' ? 'Metro Station' : selectedLocation?.type === 'train' ? 'Train Station' : 'Kolkata, West Bengal')}</p>`;
content = content.replace(mainRegex, mainReplacement);

// Share popup
const shareRegex = /<p className="share-loc-subtitle">\? \{selectedLocation\?\.address \|\| 'Ballygunge Place, Ballygunge'\}<\/p>/g;
const shareReplacement = `<p className="share-loc-subtitle">📍 {selectedLocation?.address || (selectedLocation?.type === 'toilet' ? 'Toilet' : selectedLocation?.type === 'metro' ? 'Metro Station' : selectedLocation?.type === 'train' ? 'Train Station' : 'Kolkata, West Bengal')}</p>`;
content = content.replace(shareRegex, shareReplacement);

// Wait, let's make sure the share popup regex works, because the pin emoji might be mangled as ? in the powershell output.
// I will use a more flexible regex for the share popup.
const flexibleShareRegex = /<p className="share-loc-subtitle">[^<]+'Ballygunge Place, Ballygunge'\}<\/p>/g;
content = content.replace(flexibleShareRegex, shareReplacement);

fs.writeFileSync(file, content, 'utf8');
console.log("Fixed hardcoded Ballygunge Place!");
