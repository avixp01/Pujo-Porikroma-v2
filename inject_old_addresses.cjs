const fs = require('fs');

const rawText = fs.readFileSync('pujo_addresses_old.txt', 'utf8');
const lines = rawText.split('\n').filter(l => l.trim().length > 0);

const addresses = {};
lines.forEach(line => {
    // Regex to match "1. Name (Address)" or "1. Name"
    const match = line.match(/^\d+\.\s*(.*?)(?:\((.*?)\))?$/);
    if (match) {
        let name = match[1].trim();
        let address = match[2] ? match[2].trim() : "Kolkata, West Bengal";
        addresses[name.toLowerCase()] = address;
    }
});

const filesToUpdate = [
    'src/data/pujos-part1.js',
    'src/data/pujos-part2.js',
    'src/data/pujos-part3.js',
    'src/data/pujos-part4.js'
];

filesToUpdate.forEach(file => {
    let code = fs.readFileSync(file, 'utf8');
    
    // Look for objects like: { name: "...", category: "...", ... }
    const resultCode = code.replace(/\{ name: "(.*?)", category/g, (match, name) => {
        const cleanName = name.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
        
        let foundAddress = "Kolkata, West Bengal"; // default
        for (const key in addresses) {
            // Fuzzy match logic: check if the list name is inside the file name or vice versa
            if (key.includes(cleanName) || cleanName.includes(key)) {
                foundAddress = addresses[key];
                break;
            }
        }
        
        return `{ name: "${name}", address: "${foundAddress}", category`;
    });
    
    fs.writeFileSync(file, resultCode, 'utf8');
    console.log(`Updated ${file}`);
});

console.log('Successfully injected addresses into all 4 old batch files!');
