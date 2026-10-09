const fs = require('fs');

const file = 'src/data/pujos-part4.js';
let content = fs.readFileSync(file, 'utf8');

const escapedName = "22 Pally Club".replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"${escapedName}"[^}]*\\})`, 'g');

content = content.replace(nameRegex, (match) => {
    let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: 22.5259`);
    newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: 88.3470`);
    return newMatch;
});

fs.writeFileSync(file, content, 'utf8');
console.log('22 Pally Club coordinates updated!');
