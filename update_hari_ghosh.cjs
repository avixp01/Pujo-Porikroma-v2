const fs = require('fs');

const file = 'src/data/pujos-part1.js';
let content = fs.readFileSync(file, 'utf8');

const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"Hari Ghosh Street"[^}]*\\})`, 'g');

content = content.replace(nameRegex, (match) => {
    return match.replace(
        /(?:"address"|address)\s*:\s*"[^"]+"/, 
        `"address": "15, Hari Ghosh St, Hedua, Kolkata"`
    );
});

fs.writeFileSync(file, content, 'utf8');
console.log('Hari Ghosh Street address updated!');
