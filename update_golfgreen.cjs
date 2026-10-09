const fs = require('fs');

const file = 'src/data/pujos-part2.js';
let content = fs.readFileSync(file, 'utf8');

const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"Golfgreen Phase 2"[^}]*\\})`, 'g');

content = content.replace(nameRegex, (match) => {
    return match.replace(
        /(?:"address"|address)\s*:\s*"[^"]+"/, 
        `"address": "LIG 1/2, Golf Green, Kolkata"`
    );
});

fs.writeFileSync(file, content, 'utf8');
console.log('Golfgreen Phase 2 address updated!');
