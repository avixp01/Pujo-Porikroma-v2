const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Use regex to handle Windows \r\n line endings
code = code.replace(
  /\{\/\* Filter Pills & Controls \*\/\}\r?\n\s*<div style=\{\{ display: 'flex', alignItems: 'center', paddingRight: '16px' \}\}>/g,
  `{/* Filter Pills & Controls */}
        {!isSearchFocused && (
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}>`
);

code = code.replace(
  /<\/div>\r?\n\s*<\/div>\r?\n\s*\{\/\* Map Area \*\/\}/g,
  `  </div>
        )}
        </div>

        {/* Map Area */}`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully wrapped Filter Pills using regex.');
