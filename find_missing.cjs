const fs = require('fs');

const missing = [
  'Alipore Sarbojanin',
  'Amarendra Bhavan Durga Puja',
  'Aswininagar Bandhumahal Club',
  'Aurobindo Setu Sarbojanin',
  'Baghbazar Sarbojanin Durga Puja',
  'Baghbazar Sarbojonin Durgotsab',
  'Behala Club Sarbojanin Durgotsar',
  'Bhowanipur Sarbojanin Durgotsav',
  'Burmah Shell Colony',
  'Charer Palli Sarbojanin',
  'Dakshineswar Dolpere'
];

const filesToCheck = [
    'src/data/pujos-part1.js',
    'src/data/pujos-part2.js',
    'src/data/pujos-part3.js',
    'src/data/pujos-part4.js',
    'src/data/pujo-batch5.js'
];

missing.forEach(m => {
    let found = false;
    const parts = m.split(' ');
    const searchWord = parts[0]; 
    
    for (const file of filesToCheck) {
        if (!fs.existsSync(file)) continue;
        const content = fs.readFileSync(file, 'utf8');
        
        const lines = content.split('\n');
        for (const line of lines) {
            if (line.includes('name:') || line.includes('"name":')) {
                if (line.toLowerCase().includes(searchWord.toLowerCase())) {
                    console.log(`Found candidate for ${m}: ${line.trim()}`);
                }
            }
        }
    }
});
