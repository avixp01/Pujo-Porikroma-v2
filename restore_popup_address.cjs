const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Main popup
const mainRegex = /<p className="preview-subtitle">Ballygunge Place, Ballygunge<\/p>/g;
const mainReplacement = `<p className="preview-subtitle">{selectedLocation?.address || (selectedLocation?.type === 'toilet' ? 'Toilet' : selectedLocation?.type === 'metro' ? 'Metro Station' : selectedLocation?.type === 'train' ? 'Train Station' : 'Kolkata, West Bengal')}</p>`;
content = content.replace(mainRegex, mainReplacement);

// 2. Share popup
const shareRegex = /<p className="share-loc-subtitle">\? \{selectedLocation\?\.address \|\| 'Ballygunge Place, Ballygunge'\}<\/p>/g;
const shareReplacement = `<p className="share-loc-subtitle">📍 {selectedLocation?.address || (selectedLocation?.type === 'toilet' ? 'Toilet' : selectedLocation?.type === 'metro' ? 'Metro Station' : selectedLocation?.type === 'train' ? 'Train Station' : 'Kolkata, West Bengal')}</p>`;
content = content.replace(shareRegex, shareReplacement);

fs.writeFileSync(file, content, 'utf8');
console.log("Restored dynamic addresses in popups!");
