const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace metro button SVG
const metroBtnRegex = /<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">[\s\n]*<path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.4 5.6 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.9 0 3.5-1.6 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.8 0-1.5-.7-1.5-1.5S6.7 14 7.5 14s1.5.7 1.5 1.5S8.3 17 7.5 17zm9 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm1.5-6H6V7h12v4z"\/>[\s\n]*<\/svg>[\s\n]*METRO/g;
const newMetroBtn = `<img src="/metro-icon.png" width="12" height="12" alt="metro" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
                METRO`;
code = code.replace(metroBtnRegex, newMetroBtn);

// Replace metro getItemTheme SVG
// Note that the path is exactly the same as above. Let's see if we can match it.
const metroThemeRegex = /case 'metro':[\s\S]{10,250}bg: '#dbeafe',[\s\S]{10,250}icon: <svg[\s\S]{10,400}<\/svg>[\s\S]{5,30}\};/;
const newMetroTheme = `case 'metro': 
          return { 
            color: '#2563eb', 
            bg: '#dbeafe', 
            icon: <img src="/metro-icon.png" width="20" height="20" alt="metro" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> 
          };`;

// Let's use strict match for getItemTheme
const oldMetroTheme = `case 'metro': 
          return { 
            color: '#2563eb', 
            bg: '#dbeafe', 
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 2 4 2.5 4 6v9.5C4 17.4 5.6 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.9 0 3.5-1.6 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.8 0-1.5-.7-1.5-1.5S6.7 14 7.5 14s1.5.7 1.5 1.5S8.3 17 7.5 17zm9 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm1.5-6H6V7h12v4z"/></svg> 
          };`;

if (code.includes(oldMetroTheme)) {
    code = code.replace(oldMetroTheme, newMetroTheme);
} else {
    // try regex
    code = code.replace(metroThemeRegex, newMetroTheme);
}

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Success Metro");
