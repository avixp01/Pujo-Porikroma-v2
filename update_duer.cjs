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
    if (lines[i].includes('Duer Pally Durga Puja')) {
      inPandal = true;
    }
    
    if (inPandal) {
      if (lines[i].match(/"?lat"?\s*:\s*[\d\.]+/)) {
        lines[i] = lines[i].replace(/("?lat"?\s*:\s*)[\d\.]+/, '$122.590000');
        modified = true;
      }
      if (lines[i].match(/"?lng"?\s*:\s*[\d\.]+/)) {
        lines[i] = lines[i].replace(/("?lng"?\s*:\s*)[\d\.]+/, '$188.358000');
        modified = true;
      }
      
      if (lines[i].includes('}') && modified) {
        inPandal = false;
        updated++;
      }
    }
    
    // Single line case in pujo-batch5.js
    if (lines[i].includes('Duer Pally Durga Puja') && lines[i].includes('lat:') && !modified) {
       lines[i] = lines[i].replace(/lat:\s*[\d\.]+/, 'lat: 22.590000');
       lines[i] = lines[i].replace(/lng:\s*[\d\.]+/, 'lng: 88.358000');
       modified = true;
       updated++;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  }
});

console.log("Updated Duer Pally Durga Puja in " + updated + " places.");
