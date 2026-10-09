const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');
const lines = code.split('\n');
const startLine = lines.findIndex(l => l.includes('<div className="routes-header">'));
const endLine = lines.findIndex((l, i) => i > startLine && l.includes('<div className="routes-content"'));

if (startLine !== -1 && endLine !== -1) {
  lines.splice(startLine, endLine - startLine);
  fs.writeFileSync('src/components/MapPage.jsx', lines.join('\n'));
  console.log('Removed lines from', startLine, 'to', endLine - 1);
} else {
  console.log('Could not find start or end bounds.');
}
