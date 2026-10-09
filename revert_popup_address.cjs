const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const mainRegex = /<p className="preview-subtitle">\{selectedLocation\?\.address \|\| \(selectedLocation\?\.type === 'toilet' \? 'Toilet' : selectedLocation\?\.type === 'metro' \? 'Metro Station' : selectedLocation\?\.type === 'train' \? 'Train Station' : 'Kolkata, West Bengal'\)\}<\/p>/g;
const mainReplacement = `<p className="preview-subtitle">Ballygunge Place, Ballygunge</p>`;
content = content.replace(mainRegex, mainReplacement);

const shareRegex = /<p className="share-loc-subtitle">📍 \{selectedLocation\?\.address \|\| \(selectedLocation\?\.type === 'toilet' \? 'Toilet' : selectedLocation\?\.type === 'metro' \? 'Metro Station' : selectedLocation\?\.type === 'train' \? 'Train Station' : 'Kolkata, West Bengal'\)\}<\/p>/g;
const shareReplacement = `<p className="share-loc-subtitle">? {selectedLocation?.address || 'Ballygunge Place, Ballygunge'}</p>`;
content = content.replace(shareRegex, shareReplacement);

fs.writeFileSync(file, content, 'utf8');
console.log("Reverted hardcoded Ballygunge Place!");
