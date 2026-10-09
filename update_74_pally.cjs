const fs = require('fs');

const file = 'src/data/pujos-part2.js';
let content = fs.readFileSync(file, 'utf8');

const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"74 Pally"[^}]*\\})`, 'g');

content = content.replace(nameRegex, (match) => {
    let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: 22.5425`);
    newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: 88.3260`);
    return newMatch;
});

fs.writeFileSync(file, content, 'utf8');
console.log('74 Pally coordinates updated!');
