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

// First, I need to undo the previous damage. 
// I will just git checkout the files.
const { execSync } = require('child_process');
execSync('git checkout src/data/pujos-part1.js src/data/pujos-part2.js src/data/pujos-part3.js src/data/pujos-part4.js');

let totalMatched = 0;
let totalProcessed = 0;

filesToUpdate.forEach(file => {
    let code = fs.readFileSync(file, 'utf8');
    
    const resultCode = code.replace(/("name"|name):\s*"([^"]+)",/g, (match, propName, nameValue) => {
        totalProcessed++;
        const cleanName = nameValue.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
        
        let foundAddress = "Kolkata, West Bengal";
        for (const key in addresses) {
            // Remove punctuation for better matching
            const c1 = cleanName.replace(/[^a-z0-9]/g, '');
            const c2 = key.replace(/[^a-z0-9]/g, '');
            if (c1 === c2 || c1.includes(c2) || c2.includes(c1)) {
                foundAddress = addresses[key];
                break;
            }
        }
        
        if (foundAddress !== "Kolkata, West Bengal") {
            totalMatched++;
        }
        
        return `${propName}: "${nameValue}",\n    "address": "${foundAddress}",`;
    });
    
    fs.writeFileSync(file, resultCode, 'utf8');
    console.log(`Updated ${file}`);
});

console.log(`Successfully injected addresses! Matched ${totalMatched} out of ${totalProcessed}`);
