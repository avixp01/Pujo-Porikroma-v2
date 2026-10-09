const fs = require('fs');

const updates = [
  { name: "Dum Dum Park Sarbojanin Durga Puja Samity", lat: 22.609441, lng: 88.413830 },
  { name: "Garia Mitali Sangha (Naba Durga)", lat: 22.462024, lng: 88.380146 },
  { name: "Gauri Bari Sarbojanin Durga Puja Pandal", lat: 22.594453, lng: 88.376511 },
  { name: "ITI More Durga Puja Ground, Kalyani", lat: 22.979617, lng: 88.435972 },
  { name: "JAGORANI SANGHA DURGA PUJA PANDAL", lat: 22.592992, lng: 88.382322 },
  { name: "Jorasanko 7 Palli Sarbojonin Durga Puja", lat: 22.583994, lng: 88.358756 },
  { name: "Jorasanko Sadharan Durgotsav Samity", lat: 22.586244, lng: 88.357982 },
  { name: "kalighat Yuba Maitry Durga Puja", lat: 22.522393, lng: 88.341408 },
  { name: "Lalabagan Yubak Brinda - Nabankur Sangha", lat: 22.603293, lng: 88.355777 }
];

const filesToCheck = [
    'src/data/pujos-part1.js',
    'src/data/pujos-part2.js',
    'src/data/pujos-part3.js',
    'src/data/pujos-part4.js',
    'src/data/pujo-batch5.js'
];

let updatedCount = 0;

for (const file of filesToCheck) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    for (const update of updates) {
        const escapedName = update.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"${escapedName}"[^}]*\\})`, 'g');
        
        let localModified = false;
        content = content.replace(nameRegex, (match) => {
            localModified = true;
            let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: ${update.lat}`);
            newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: ${update.lng}`);
            return newMatch;
        });

        if (localModified) {
            modified = true;
            updatedCount++;
            console.log(`Updated fallback ${update.name} in ${file}`);
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
    }
}
console.log(`Fallback updates complete! Updated ${updatedCount} pandals.`);
