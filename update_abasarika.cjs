const fs = require('fs');

const file = 'src/data/pujos-part3.js';
let content = fs.readFileSync(file, 'utf8');

const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"Abasarika Club"[^}]*\\})`, 'g');

content = content.replace(nameRegex, (match) => {
    let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: 22.5129`);
    newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: 88.3694`);
    return newMatch;
});

fs.writeFileSync(file, content, 'utf8');
console.log('Abasarika Club coordinates updated!');
