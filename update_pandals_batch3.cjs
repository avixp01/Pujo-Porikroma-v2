const fs = require('fs');

const updates = [
  { name: "76 Palli", aliases: ["76 Palli", "76 Palli Club"], lat: 22.5338025, lng: 88.3400156 },
  { name: "77 Palli", aliases: ["77 Palli"], lat: 22.510417, lng: 88.371047 },
  { name: "95 Pally", aliases: ["95 Pally"], lat: 22.508235, lng: 88.3627602 },
  { name: "AA Block", aliases: ["AA Block"], lat: 22.592058, lng: 88.3972815 },
  { name: "AB Block", aliases: ["AB Block"], lat: 22.593313, lng: 88.3997852 },
  { name: "Abasar Sarbojanin", aliases: ["Abasar Sarbojanin", "Abasar Sarbojonin"], lat: 22.5278699, lng: 88.3489227 },
  { name: "Abasarika Club", aliases: ["Abasarika Club"], lat: 22.5279538, lng: 88.3077231 },
  { name: "Adi Lake Palli", aliases: ["Adi Lake Palli"], lat: 22.5150666, lng: 88.3497199 }
];

const filesToCheck = [
    'src/data/pujos-part1.js',
    'src/data/pujos-part2.js',
    'src/data/pujos-part3.js',
    'src/data/pujos-part4.js',
    'src/data/pujo-batch5.js'
];

for (const file of filesToCheck) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    for (const update of updates) {
        for (const alias of update.aliases) {
            const escapedName = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"${escapedName}"[^}]*\\})`, 'g');
            
            content = content.replace(nameRegex, (match) => {
                modified = true;
                console.log(`Updating ${alias} in ${file}`);
                
                let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: ${update.lat}`);
                newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: ${update.lng}`);
                
                return newMatch;
            });
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
    }
}
console.log('Batch 3 updates complete!');
