const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));

files.forEach(f => {
  const txt = fs.readFileSync(path.join(dataDir, f), 'utf8');
  const m = txt.match(/Akra Railway Station[\s\S]*?lng[":\s]*[\d\.]+/gi);
  if(m) console.log(f, m);
});
