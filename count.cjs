const fs = require('fs');
const dir = fs.readdirSync('src/data');
let c=0;
dir.forEach(f => {
  if(f.endsWith('.js')){
    const txt = fs.readFileSync('src/data/'+f, 'utf8');
    const m = txt.match(/category:\s*["']Train["']/g);
    if(m) c+=m.length;
  }
});
console.log('Total Train markers:', c);
