const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));

let updated = 0;

files.forEach(f => {
  const filePath = path.join(dataDir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  let lines = content.split(/\r?\n/);
  let modified = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Akra Railway Station') && lines[i].includes('lat:')) {
       lines[i] = lines[i].replace(/lat:\s*[\d\.]+/, 'lat: 22.514700');
       lines[i] = lines[i].replace(/lng:\s*[\d\.]+/, 'lng: 88.249300');
       modified = true;
       updated++;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  }
});

console.log("Updated Akra Railway Station in " + updated + " places.");
