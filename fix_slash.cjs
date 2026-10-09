const fs = require('fs');
let content = fs.readFileSync('src/components/MapPage.jsx', 'utf8');
content = content.replace('\\\\n  const [showTimetablePopup', '\\n  const [showTimetablePopup');
fs.writeFileSync('src/components/MapPage.jsx', content, 'utf8');
console.log('Fixed literal slash');
