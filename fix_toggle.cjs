const fs = require('fs');
let c = fs.readFileSync('add_visited_toggle3.cjs', 'utf8');

c = c.replace(/<span className="metro-name">Jatin Das Park<\/span>.*2\.4 km walk/g, 
  '<span className="metro-name">Jatin Das Park</span> - exit <span className="metro-gate">Gate 3</span> - 2.4 km walk');

fs.writeFileSync('add_visited_toggle3.cjs', c, 'utf8');
console.log('Fixed ascii');
