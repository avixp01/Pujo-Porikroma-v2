const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace the text NEARBY with MATCHES NEARBY in the inline style div
code = code.replace(
  />NEARBY<\/div>/g,
  '>MATCHES NEARBY</div>'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Changed text to MATCHES NEARBY.');
