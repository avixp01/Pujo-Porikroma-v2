const fs = require('fs');

const file = 'src/data/pujos-part4.js';
let content = fs.readFileSync(file, 'utf8');

const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"75 Pally(?: Khidderpore)?"[^}]*\\})`, 'g');

content = content.replace(nameRegex, (match) => {
    let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: 22.540373`);
    newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: 88.321389`);
    return newMatch;
});

fs.writeFileSync(file, content, 'utf8');
console.log('75 Pally coordinates updated!');
