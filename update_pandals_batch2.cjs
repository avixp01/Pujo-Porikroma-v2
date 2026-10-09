const fs = require('fs');

const updates = [
  { name: "37 Pally", aliases: ["37 Pally"], lat: 22.5714, lng: 88.3642 },
  { name: "41 Pally", aliases: ["41 Pally"], lat: 22.4782, lng: 88.3415 },
  { name: "64 Pally", aliases: ["64 Pally"], lat: 22.5238, lng: 88.3491 },
  { name: "66 Palli", aliases: ["66 Palli"], lat: 22.5174, lng: 88.3448 },
  { name: "68 Pally", aliases: ["68 Pally"], lat: 22.5318, lng: 88.3445 },
  { name: "74 Pally", aliases: ["74 Pally"], lat: 22.5401, lng: 88.3322 },
  { name: "75 Pally", aliases: ["75 Pally", "75 Pally Khidderpore"], lat: 22.5392, lng: 88.3309 },
  { name: "76 Palli", aliases: ["76 Palli", "76 Palli Club"], lat: 22.5342, lng: 88.3421 },
  { name: "77 Palli", aliases: ["77 Palli"], lat: 22.5118, lng: 88.3712 },
  { name: "95 Pally", aliases: ["95 Pally"], lat: 22.5034, lng: 88.3649 },
  { name: "AA Block", aliases: ["AA Block"], lat: 22.5872, lng: 88.4065 },
  { name: "AB Block", aliases: ["AB Block"], lat: 22.5881, lng: 88.4078 },
  { name: "Abasar Sarbojanin", aliases: ["Abasar Sarbojanin", "Abasar Sarbojonin"], lat: 22.5312, lng: 88.3452 },
  { name: "Abasarika Club", aliases: ["Abasarika Club"], lat: 22.5129, lng: 88.3694 },
  { name: "AC Block", aliases: ["AC Block"], lat: 22.5894, lng: 88.4712 },
  { name: "Acharya Prafulla Sangha - Behala", aliases: ["Acharya Prafulla Sangha - Behala"], lat: 22.4883, lng: 88.3115 },
  { name: "Adi Ballygunge", aliases: ["Adi Ballygunge"], lat: 22.5261, lng: 88.3662 },
  { name: "Adi Lake Palli", aliases: ["Adi Lake Palli"], lat: 22.5143, lng: 88.3541 }
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
console.log('Batch 2 updates complete!');
