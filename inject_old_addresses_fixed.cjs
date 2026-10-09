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
    
    // Look for objects like:
    // {
    //   "name": "...",
    //   "category": "...",
    // OR
    // { name: "...", category: ...
    
    // We will match the `"name": "..."` line and inject `"address": "...",` right after it.
    // Make sure we don't duplicate addresses if already injected.
    
    const resultCode = code.replace(/("name"|name):\s*"([^"]+)",/g, (match, propName, nameValue) => {
        const cleanName = nameValue.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
        
        let foundAddress = "Kolkata, West Bengal";
        for (const key in addresses) {
            if (key.includes(cleanName) || cleanName.includes(key)) {
                foundAddress = addresses[key];
                break;
            }
        }
        
        return `${propName}: "${nameValue}",\n    "address": "${foundAddress}",`;
    });
    
    fs.writeFileSync(file, resultCode, 'utf8');
    console.log(`Updated ${file}`);
});

console.log('Successfully injected addresses with new regex!');
