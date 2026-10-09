const fs = require('fs');
let code = fs.readFileSync('src/data/allPujos.js', 'utf8');

const targetStr = `rawPujos.forEach(pujo => {
    const cleanName = pujo.name.trim().toLowerCase();
    if (!uniquePujosMap.has(cleanName)) {
        uniquePujosMap.set(cleanName, pujo);
    }
});`;

const replacementStr = `rawPujos.forEach(pujo => {
    // Strip text in brackets/parentheses to render clean names
    pujo.name = pujo.name.replace(/\\s*\\(.*?\\)\\s*/g, '').trim();
    
    const cleanName = pujo.name.toLowerCase();
    if (!uniquePujosMap.has(cleanName)) {
        uniquePujosMap.set(cleanName, pujo);
    }
});`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('src/data/allPujos.js', code, 'utf8');
    console.log('Successfully added bracket stripping to allPujos.js');
} else {
    console.log('Target string not found!');
}
