const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace Compass SVG colors
code = code.replace(/stroke="#4285F4"/g, 'stroke="currentColor"');
code = code.replace(/fill="#EA4335"/g, 'fill="currentColor"');
code = code.replace(/fill="#4285F4"/g, 'fill="currentColor"');

// Replace Locate SVG colors
code = code.replace(/stroke=\{isFollowing \? "#1a73e8" : "#4285F4"\}/g, 'stroke="currentColor"');
code = code.replace(/fill=\{isFollowing \? "#1a73e8" : "#4285F4"\}/g, 'fill="currentColor"');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully replaced with regex");
