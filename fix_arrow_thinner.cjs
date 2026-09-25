const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const oldPath = 'd="M5 21 V12 a4 4 0 0 1 4-4 H13 V4 L19 10 L13 16 V12 H9 V21 Z"';
const newPath = 'd="M6 21 V11 a2 2 0 0 1 2-2 H13 V4 L19 10 L13 16 V11 H8 V21 Z"';

if (code.includes(oldPath)) {
    code = code.replace(oldPath, newPath);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully replaced path");
} else {
    console.log("Old path not found!");
}
