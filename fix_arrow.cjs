const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const oldPath = 'd="M5 22 V15 a8 8 0 0 1 8-8 H14 V3 L22 11 L14 19 V15 H13 V22 Z"';
const newPath = 'd="M5 21 V12 a4 4 0 0 1 4-4 H13 V4 L19 10 L13 16 V12 H9 V21 Z"';

if (code.includes(oldPath)) {
    code = code.replace(oldPath, newPath);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully replaced path");
} else {
    console.log("Old path not found!");
}
