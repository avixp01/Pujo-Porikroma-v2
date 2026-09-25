const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStyle1 = 'style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }}';
const newStyle1 = 'style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }}';

// Just in case formatting differs slightly:
code = code.replace(/style=\{\{ width: "24px", height: "24px", filter: isDarkMode \? "invert\(1\)" : "none" \}\}/g, newStyle1);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Replaced fixed width/height with auto width and smaller height to fix aspect ratio");
