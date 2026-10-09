const fs = require('fs');
const { execSync } = require('child_process');

execSync('git checkout src/data/pujos-part1.js src/data/pujos-part2.js src/data/pujos-part3.js src/data/pujos-part4.js');

const rawText = fs.readFileSync('pujo_addresses_old.txt', 'utf8');
const lines = rawText.split('\n').filter(l => l.trim().length > 0);

const addresses = {};
lines.forEach(line => {
    const match = line.match(/^\d+\.\s*(.*?)(?:\((.*?)\))?$/);
    if (match) {
        let name = match[1].trim();
        if (name.length < 3) return; // Skip empty or too short names
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

let totalMatched = 0;
let totalProcessed = 0;

filesToUpdate.forEach(file => {
    let code = fs.readFileSync(file, 'utf8');
    
    const resultCode = code.replace(/("name"|name):\s*"([^"]+)",/g, (match, propName, nameValue) => {
        totalProcessed++;
        const cleanName = nameValue.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
        
        let foundAddress = "Kolkata, West Bengal";
        
        // 1. Try exact match first
        if (addresses[cleanName]) {
            foundAddress = addresses[cleanName];
        } else {
            // 2. Try fuzzy match
            const c1 = cleanName.replace(/[^a-z0-9]/g, '');
            for (const key in addresses) {
                const c2 = key.replace(/[^a-z0-9]/g, '');
                if (c2.length < 4) continue;
                if (c1 === c2 || c1.includes(c2) || c2.includes(c1)) {
                    foundAddress = addresses[key];
                    break;
                }
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
