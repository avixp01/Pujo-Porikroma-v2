const fs = require('fs');

const file = 'src/data/pujos-part3.js';
let content = fs.readFileSync(file, 'utf8');

const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"AC Block"[^}]*\\})`, 'g');

let matched = false;
content = content.replace(nameRegex, (match) => {
    matched = true;
    let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: 22.5858523`);
    newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: 88.4502132`);
    return newMatch;
});

if (matched) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('AC Block coordinates updated in part 3!');
} else {
    console.log('AC Block not found in part 3. Let me check part 1, 2, 4, 5...');
    // If not found in 3, script will just not update it. I will run a global one if it fails.
}
