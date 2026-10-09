const fs = require('fs');
let c = fs.readFileSync('src/components/MapPage.jsx', 'utf8');
c = c.replace(/<span className="metro-name">Jatin Das Park<\/span>[^<]+<span className="metro-gate">Gate 3<\/span>[^<]+2\.4 km walk/g, 
  '<span className="metro-name">Jatin Das Park</span> - exit <span className="metro-gate">Gate 3</span> - 2.4 km walk');
fs.writeFileSync('src/components/MapPage.jsx', c, 'utf8');
console.log('Fixed ascii in map page');
