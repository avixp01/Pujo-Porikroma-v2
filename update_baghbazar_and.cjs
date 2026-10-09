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
    if (lines[i].includes('Baghbazar Palli and Sarbojanin Durgotsab Exhibition')) {
      inPandal = true;
    }
    
    if (inPandal) {
      if (lines[i].match(/"?lat"?\s*:\s*[\d\.]+/)) {
        lines[i] = lines[i].replace(/("?lat"?\s*:\s*)[\d\.]+/, '$122.598000');
        modified = true;
      }
      if (lines[i].match(/"?lng"?\s*:\s*[\d\.]+/)) {
        lines[i] = lines[i].replace(/("?lng"?\s*:\s*)[\d\.]+/, '$188.360000');
        modified = true;
      }
      
      if (lines[i].match(/}/) && modified) {
        inPandal = false;
        updated++;
      }
    }
    // single line format handling
    if (lines[i].includes('Baghbazar Palli and Sarbojanin Durgotsab Exhibition') && lines[i].includes('lat:') && !modified) {
       lines[i] = lines[i].replace(/lat:\s*[\d\.]+/, 'lat: 22.598000');
       lines[i] = lines[i].replace(/lng:\s*[\d\.]+/, 'lng: 88.360000');
       modified = true;
       updated++;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  }
});

console.log("Updated Baghbazar Palli and Sarbojanin in " + updated + " places.");
