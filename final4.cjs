const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">[\s\n]*<path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.4 5.6 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.9 0 3.5-1.6 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.8 0-1.5-.7-1.5-1.5S6.7 14 7.5 14s1.5.7 1.5 1.5S8.3 17 7.5 17zm9 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm1.5-6H6V7h12v4z"\/>[\s\n]*<\/svg>[\s\n]*TRAIN/g;

const replacement = `<img src="/train-icon.png" width="12" height="12" alt="train" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
                TRAIN`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Success");
