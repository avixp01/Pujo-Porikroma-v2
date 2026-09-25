const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace the squished pandal icon definition in getItemTheme
code = code.replace(
  /<img src="\/pandel-icon\.png" width="20" height="20" alt="pandal" style=\{\{ filter: isDarkMode \? 'invert\(1\)' : 'none' \}\} \/>/g,
  '<img src="/pandel-icon.png" alt="pandal" style={{ width: "20px", height: "20px", objectFit: "contain", filter: isDarkMode ? \'invert(1)\' : \'none\' }} />'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed aspect ratio of pandal icon in list.');
