const fs = require('fs');

const updates = [
  { name: "Satero Pally Sarbojonin Durgotsav", lat: 22.592795, lng: 88.398934 },
  { name: "Sealdah Railway Athletic Club", lat: 22.570577, lng: 88.369365 },
  { name: "Sebak Sangha", lat: 22.511659, lng: 88.347225 },
  { name: "Selimpur Naskarpara", lat: 22.509735, lng: 88.340906 },
  { name: "Selimpur Pally", lat: 22.504678, lng: 88.368366 },
  { name: "Shastri Bagan Sporting Club", lat: 22.612953, lng: 88.426706 },
  { name: "Shibmandir Sarbojonin Durgotsab", lat: 22.510997, lng: 88.347275 },
  { name: "Shimla Vivekananda Sporting Club", lat: 22.475550, lng: 88.336715 },
  { name: "Shiv Mandir Sarbajanin Durga Puja", lat: 22.510997, lng: 88.347275 },
  { name: "Shurir Bagan", lat: 22.594997, lng: 88.385027 },
  { name: "Shyamapally Shyama Sangha", lat: 22.491445, lng: 88.368771 },
  { name: "Sikdar Bagan Sadharan Durgotov", lat: 22.596485, lng: 88.369415 },
  { name: "Simla Byam Samity", lat: 22.585137, lng: 88.361971 },
  { name: "Singhi Park", lat: 22.520949, lng: 88.360153 },
  { name: "Sitalatala Kishore Sangha", lat: 22.480932, lng: 88.321566 },
  { name: "Sodepur Deep Prangan", lat: 22.701951, lng: 88.377551 },
  { name: "Sodepur Pragati Sangha", lat: 22.481016, lng: 88.328700 },
  { name: "Sovabazar Beniabola", lat: 22.596898, lng: 88.350903 },
  { name: "Sovabazar Rajbarir Durga Pujo", lat: 22.596264, lng: 88.364805 },
  { name: "Sovabazar Sarbojonin", lat: 22.596264, lng: 88.357080 },
  { name: "Sreebhumi Sporting Club", lat: 22.598899, lng: 88.400358 },
  { name: "Sri Sri Jagaddhatri Puja Kumartuli", lat: 22.599417, lng: 88.360526 },
  { name: "Srimani Barir Durga Pujo", lat: 22.581959, lng: 88.370546 },
  { name: "State Bank Park", lat: 22.467777, lng: 88.306496 },
  { name: "Surir Bagan Sarbojanin Durgapuja", lat: 22.594997, lng: 88.385027 },
  { name: "Suruchi Sangha", lat: 22.508985, lng: 88.331377 },
  { name: "Surya Nagar Sarbojanin", lat: 22.544569, lng: 88.346171 },
  { name: "Swapnar Bagan", lat: 22.579901, lng: 88.392934 },
  { name: "Swapner Bagan Sporting Club", lat: 22.579191, lng: 88.393332 },
  { name: "Tala Barowari", lat: 22.607204, lng: 88.373501 },
  { name: "Tala Palli", lat: 22.606905, lng: 88.372075 },
  { name: "Tala PoneroPally Durga Puja", lat: 22.612476, lng: 88.382585 },
  { name: "Tala Prattoy", lat: 22.608791, lng: 88.379927 },
  { name: "Tarapukur Adi Sarbajanin Durgotsav commitee Milan sangha", lat: 22.685788, lng: 88.386915 },
  { name: "Tarun Sathi", lat: 22.491106, lng: 88.369947 },
  { name: "Tarun Sporting Club", lat: 22.586514, lng: 88.362419 },
  { name: "Tejendra Uddyan", lat: 22.586267, lng: 88.357793 },
  { name: "Telengabagan", lat: 22.596294, lng: 88.384406 },
  { name: "Thanthania Dutta Bari", lat: 22.580575, lng: 88.363310 },
  { name: "The Bengal Boys Training Association", lat: 22.518124, lng: 88.338812 },
  { name: "Triangular Park Sarbojanin", lat: 22.517979, lng: 88.357964 },
  { name: "Tridhara Sammilani", lat: 22.519529, lng: 88.352865 },
  { name: "trishakti sangha", lat: 22.498258, lng: 88.316352 },
  { name: "Ultadanga Bidhan Sangha", lat: 22.593765, lng: 88.382066 },
  { name: "Ultadanga Pallyshree Durga Puja", lat: 22.593765, lng: 88.382066 },
  { name: "United Club", lat: 22.612473, lng: 88.424827 },
  { name: "Uttar Kolkata Sarbojanin Durga Puja- Birendra Mancha", lat: 22.599329, lng: 88.366866 },
  { name: "Vidyasagar central sarbajanin durgotsab", lat: 22.481198, lng: 88.372406 },
  { name: "Vivekananda Park Athletic Club", lat: 22.481375, lng: 88.334732 },
  { name: "Vivekananda Sarbojanin Durgotsav", lat: 22.585487, lng: 88.372916 },
  { name: "Vivekananda Sarbojanin Durgatsob Committee", lat: 22.585427, lng: 88.368153 },
  { name: "Vivekananda Sishu Udyan", lat: 22.483183, lng: 88.374312 },
  { name: "Vivekananda Sporting Club", lat: 22.475550, lng: 88.336715 },
  { name: "Wellington Nagarik Kalyan Samity", lat: 22.564522, lng: 88.355808 },
  { name: "Yuba Sangha Club", lat: 22.464519, lng: 88.315836 },
  { name: "Yuva Brinda", lat: 22.486008, lng: 88.309514 }
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
            console.log(`Updated ${update.name} in ${file}`);
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
    }
}
console.log(`Batch 327-384 updates complete! Updated ${updatedCount} pandals.`);
