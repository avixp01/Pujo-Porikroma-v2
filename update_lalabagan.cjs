const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));

let updated = 0;

files.forEach(f => {
  const filePath = path.join(dataDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let lines = content.split(/\r?\n/);
  let inPandal = false;
  let modified = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Lalabagan Yubak Brinda - Nabankur Sangha')) {
      inPandal = true;
    }
    
    if (inPandal) {
      if (lines[i].match(/"?lat"?\s*:\s*[\d\.]+/)) {
        lines[i] = lines[i].replace(/("?lat"?\s*:\s*)[\d\.]+/, '$122.587800');
        modified = true;
      }
      if (lines[i].match(/"?lng"?\s*:\s*[\d\.]+/)) {
        lines[i] = lines[i].replace(/("?lng"?\s*:\s*)[\d\.]+/, '$188.376900');
        modified = true;
      }
      
      // If we hit a closing brace or another name, we might be out
      if (lines[i].includes('}') && modified) {
        inPandal = false;
        updated++;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  }
});

console.log("Updated Lalabagan Yubak Brinda in " + updated + " places.");
