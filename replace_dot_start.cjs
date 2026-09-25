const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = '<div className="dot-start" />';
const replacement = '<Home size={14} color="#3b82f6" style={{ marginBottom: \'2px\' }} />';

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully replaced dot-start with Home icon");
} else {
    console.log("Could not find target");
}
