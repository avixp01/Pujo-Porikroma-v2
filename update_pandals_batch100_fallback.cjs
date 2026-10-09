const fs = require('fs');

const updates = [
  { name: "ALIPORE SARBOJANIN", lat: 22.519172, lng: 88.330826 },
  { name: "Amarendra Bhavan Durga Puja (Roy House Puja)", lat: 22.501587, lng: 88.316298 },
  { name: "Aswininagar Bandhumahal Club, Baguiati", lat: 22.610021, lng: 88.430353 },
  { name: "AUROBINDO SETU SARBOJANIN DURGAPUJA SAMITI", lat: 22.594487, lng: 88.377976 },
  { name: "Baghbazar Sarbojonin Durgotsab & Exhibition", lat: 22.603782, lng: 88.359205 },
  { name: "Behala Club Sarbojanin Durgotsar Committee", lat: 22.505260, lng: 88.311506 },
  { name: "Bhowanipur Sarbojanin Durgotsav Durga puja", lat: 22.534992, lng: 88.341269 },
  { name: "Burmah Shell Colony, Sodepur", lat: 22.698466, lng: 88.383708 },
  { name: "Charer Palli Sarbojanin Durgotsav", lat: 22.617070, lng: 88.387862 },
  { name: "Dakshineswar Dolpere Adi Sabojonin Durgapuja", lat: 22.659294, lng: 88.364499 }
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
