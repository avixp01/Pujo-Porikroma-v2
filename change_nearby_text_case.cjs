const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace MATCHES NEARBY with Matches Nearby just to be perfectly compliant
code = code.replace(
  />MATCHES NEARBY<\/div>/g,
  '>Matches Nearby</div>'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Changed text to Matches Nearby.');
