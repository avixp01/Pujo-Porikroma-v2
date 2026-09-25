const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

if (code.includes('padding: 8px 18px; /* Reduced by 5px more */')) {
    code = code.replace('padding: 8px 18px; /* Reduced by 5px more */', 'padding: 10px 24px; /* Increased button size */');
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully increased mode-btn padding");
} else {
    console.log("Could not find the target CSS");
}
