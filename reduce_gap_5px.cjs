const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

if (code.includes('padding: 8px 23px; /* Reduced by 1px */')) {
    code = code.replace('padding: 8px 23px; /* Reduced by 1px */', 'padding: 8px 18px; /* Reduced by 5px more */');
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully reduced gap/padding by 5px more");
} else {
    // maybe it is already 24?
    if (code.includes('padding: 8px 24px;')) {
        code = code.replace('padding: 8px 24px;', 'padding: 8px 19px; /* Reduced by 5px */');
        fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
        console.log("Successfully reduced gap/padding by 5px from 24 to 19");
    } else {
        console.log("Could not find the target CSS");
    }
}
