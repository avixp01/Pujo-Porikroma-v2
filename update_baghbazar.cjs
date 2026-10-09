const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));

let updated = 0;

files.forEach(f => {
  const filePath = path.join(dataDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // A regex to find the object containing "name": "Baghbazar Pally" and update its lat/lng
  // We can just split by line and state machine it
  let lines = content.split(/\r?\n/);
  let inBaghbazar = false;
  let modified = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Baghbazar Pally')) {
      inBaghbazar = true;
    }
    
    if (inBaghbazar) {
      if (lines[i].match(/"?lat"?\s*:\s*[\d\.]+/)) {
        lines[i] = lines[i].replace(/("?lat"?\s*:\s*)[\d\.]+/, '$122.603150');
        modified = true;
      }
      if (lines[i].match(/"?lng"?\s*:\s*[\d\.]+/)) {
        lines[i] = lines[i].replace(/("?lng"?\s*:\s*)[\d\.]+/, '$188.366900');
        modified = true;
      }
      
      // If we hit a closing brace or another name, we might be out
      if (lines[i].includes('}') && modified) {
        inBaghbazar = false; // we processed it
        updated++;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  }
});

console.log("Updated Baghbazar Pally in " + updated + " places.");
