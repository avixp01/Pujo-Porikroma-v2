const fs = require('fs');

const updates = [
  { name: "Sikdar Bagan Sadharan Durgotsov", lat: 22.596485, lng: 88.369415 },
  { name: "Sodepur Pragati Sangha (Haridevpur)", lat: 22.481016, lng: 88.328700 },
  { name: "Sovabazar Beniatola", lat: 22.596898, lng: 88.350903 },
  { name: "Surya Nagar Sarbojonin", lat: 22.544569, lng: 88.346171 },
  { name: "Tala Ponero (15) Pally Durga Puja", lat: 22.612476, lng: 88.382585 },
  { name: "Tejendra Uddyan (Teenkonia Park)", lat: 22.586267, lng: 88.357793 },
  { name: "Vivekananda Sarbojonin Durgatsob Committee", lat: 22.585427, lng: 88.368153 }
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
