const fs = require('fs');

const file = 'src/data/pujos-part2.js';
let content = fs.readFileSync(file, 'utf8');

const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"Golden Arrow Club"[^}]*\\})`, 'g');

content = content.replace(nameRegex, (match) => {
    return match.replace(
        /(?:"address"|address)\s*:\s*"[^"]+"/, 
        `"address": "Tara Rd, Lake Market, Kalighat, Kolkata"`
    );
});

fs.writeFileSync(file, content, 'utf8');
console.log('Golden Arrow Club address updated!');
