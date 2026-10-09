const fs = require('fs');
let lines = fs.readFileSync('src/components/MapPage.jsx', 'utf8').split('\\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('setShowUpdatePopup(false);\\n  const [showTimetablePopup')) {
    lines[i] = lines[i].replace('\\n  const [showTimetablePopup, setShowTimetablePopup] = useState(false);', '');
    lines.splice(i + 1, 0, '  const [showTimetablePopup, setShowTimetablePopup] = useState(false);');
    break;
  }
}

fs.writeFileSync('src/components/MapPage.jsx', lines.join('\\n'), 'utf8');
console.log('Fixed literally backslash n using splice');
