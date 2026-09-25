const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

if (code.includes('padding: 8px 24px;')) {
    code = code.replace('padding: 8px 24px;', 'padding: 8px 23px; /* Reduced by 1px */');
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully reduced gap/padding by 1px");
} else {
    // maybe it is already 23?
    if (code.includes('padding: 8px 23px;')) {
        code = code.replace('padding: 8px 23px;', 'padding: 8px 22px; /* Reduced by 1px */');
        fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
        console.log("Successfully reduced gap/padding by 1px from 23 to 22");
    } else {
        console.log("Could not find the target CSS");
    }
}
