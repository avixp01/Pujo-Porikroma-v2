const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /<img src="\/toilet-icon\.png" width="20" height="20" alt="toilet" style=\{\{ filter: isDarkMode \? 'invert\(1\)' : 'none' \}\} \/>/g,
  '<img src="/toilet-icon.png" alt="toilet" style={{ width: "20px", height: "20px", objectFit: "contain", filter: isDarkMode ? \'invert(1)\' : \'none\' }} />'
);

code = code.replace(
  /<img src="\/metro-icon\.png" width="20" height="20" alt="metro" style=\{\{ filter: isDarkMode \? 'invert\(1\)' : 'none' \}\} \/>/g,
  '<img src="/metro-icon.png" alt="metro" style={{ width: "20px", height: "20px", objectFit: "contain", filter: isDarkMode ? \'invert(1)\' : \'none\' }} />'
);

code = code.replace(
  /<img src="\/train-icon\.png" width="20" height="20" alt="train" style=\{\{ filter: isDarkMode \? 'invert\(1\)' : 'none' \}\} \/>/g,
  '<img src="/train-icon.png" alt="train" style={{ width: "20px", height: "20px", objectFit: "contain", filter: isDarkMode ? \'invert(1)\' : \'none\' }} />'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed aspect ratio for toilet, metro, and train icons.');
