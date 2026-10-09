const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// The main container padding
content = content.replace(/<div style=\{\{ padding: '20px 16px' \}\}>/g, "<div style={{ padding: '20px 16px 0 16px' }}>");

// Reset the margin top of the navigation button to a solid 10px instead of fighting with the 20px padding
content = content.replace(/marginTop: '-1px'/g, "marginTop: '12px'");

fs.writeFileSync(file, content, 'utf8');
console.log("Fixed the actual padding causing the gap!");
