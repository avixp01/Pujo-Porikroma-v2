const fs = require('fs');
const path = require('path');

const updates = [
  { name: "20 Palli Sarbojani Durgotsab", lat: 22.5939, lng: 88.3534 },
  { name: "22 Pally Club", lat: 22.5312, lng: 88.3452 },
  { name: "25 Pally Club", lat: 22.5430, lng: 88.3310 },
  { name: "37 Pally", lat: 22.5752, lng: 88.3632 },
  { name: "41 Pally", lat: 22.4622, lng: 88.3382 },
  { name: "64 Pally", lat: 22.5196, lng: 88.3536 },
  { name: "66 Palli", lat: 22.5180, lng: 88.3460 },
  { name: "68 Pally", lat: 22.5320, lng: 88.3450 },
  { name: "74 Pally", lat: 22.5425, lng: 88.3305 },
  { name: "75 Pally", lat: 22.5410, lng: 88.3290 },
  { name: "76 Palli", lat: 22.5350, lng: 88.3410 },
  { name: "77 Palli", lat: 22.5110, lng: 88.3700 },
  { name: "95 Pally", lat: 22.5053, lng: 88.3657 },
  { name: "AA Block", lat: 22.5850, lng: 88.4050 },
  { name: "AB Block", lat: 22.5860, lng: 88.4060 },
  { name: "Abasar Sarbojanin", lat: 22.5315, lng: 88.3455 },
  { name: "Abasarika Club", lat: 22.5140, lng: 88.3680 },
  { name: "AC Block", lat: 22.5900, lng: 88.4700 },
  { name: "Acharya Prafulla Sangha - Behala", lat: 22.4890, lng: 88.3120 },
  { name: "Adi Ballygunge", lat: 22.5270, lng: 88.3670 },
  { name: "Adi Lake Palli", lat: 22.5150, lng: 88.3550 }
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
        // Regex to match the pandal block. It looks for the name, then lat, then lng within the same block.
        // Since we don't know the exact order of keys in every file, we can do a targeted replace using a replacer function.
        // A safer way: match the object containing the name.
        
        // Escape name for regex
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
console.log('Update complete!');
