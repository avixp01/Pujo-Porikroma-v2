const fs = require('fs');

const rawText = fs.readFileSync('pujo_addresses.txt', 'utf8');
const lines = rawText.split('\n').filter(l => l.trim().length > 0);

const addresses = {};
lines.forEach(line => {
    // Regex to match "1. Name (Address)" or "1. Name"
    const match = line.match(/^\d+\.\s*(.*?)(?:\((.*?)\))?$/);
    if (match) {
        let name = match[1].trim();
        let address = match[2] ? match[2].trim() : "Unknown Location";
        addresses[name.toLowerCase()] = address;
    }
});

let code = fs.readFileSync('src/data/pujo-batch5.js', 'utf8');

// Use regex to find each object and inject address if matched
// The objects look like: { name: "Newland Durgapuja Mandap", category: "Pujo", lat: 22.4820, lng: 88.2450 }
const resultCode = code.replace(/\{ name: "(.*?)", category/g, (match, name) => {
    // The name in pujo-batch5.js might match exactly or closely
    const cleanName = name.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
    
    // Find best match in addresses
    let foundAddress = "Unknown Location";
    for (const key in addresses) {
        if (key.includes(cleanName) || cleanName.includes(key)) {
            foundAddress = addresses[key];
            break;
        }
    }
    
    return `{ name: "${name}", address: "${foundAddress}", category`;
});

fs.writeFileSync('src/data/pujo-batch5.js', resultCode, 'utf8');
console.log('Successfully injected addresses into pujo-batch5.js!');
