const fs = require('fs');

const missedUpdates = [
  { name: "25 Pally", lat: 22.5430, lng: 88.3310 }, // 25 Pally Club
  { name: "75 Pally Khidderpore", lat: 22.5410, lng: 88.3290 }, // 75 Pally
  { name: "76 Palli Club", lat: 22.5350, lng: 88.3410 }, // 76 Palli
  { name: "Abasar Sarbojonin", lat: 22.5315, lng: 88.3455 } // Abasar Sarbojanin
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

    for (const update of missedUpdates) {
        const escapedName = update.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"${escapedName}"[^}]*\\})`, 'g');
        
        content = content.replace(nameRegex, (match) => {
            modified = true;
            console.log(`Updating ${update.name} in ${file}`);
            
            // Replace lat
            let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: ${update.lat}`);
            // Replace lng
            newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: ${update.lng}`);
            
            return newMatch;
        });
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
    }
}
console.log('Missed updates complete!');
