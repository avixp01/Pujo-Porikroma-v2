const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

// Change direction-list-item padding to 0 16px
code = code.replace(/padding: 16px;\s*cursor: pointer;/g, 'padding: 0 16px;\n    cursor: pointer;');

// Change item-content padding-bottom to padding: 16px 0
code = code.replace(/padding-bottom: 16px;/g, 'padding: 16px 0;');

fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
console.log("Successfully fixed vertical alignment of text and icons in list");
