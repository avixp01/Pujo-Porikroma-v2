const fs = require('fs');

const file = 'src/data/pujos-part2.js';
let content = fs.readFileSync(file, 'utf8');

const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"25 Pally(?: Club)?"[^}]*\\})`, 'g');

content = content.replace(nameRegex, (match) => {
    let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: 22.5426`);
    newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: 88.3310`);
    return newMatch;
});

fs.writeFileSync(file, content, 'utf8');
console.log('25 Pally Club coordinates updated to v3!');
