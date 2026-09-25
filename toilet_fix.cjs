const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace toilet button SVG
const toiletBtnRegex = /<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">[\s\n]*<path d="M6 3h8v3H6zm11 6c0-1.7-1.3-3-3-3H4c-1.1 0-2 .9-2 2v6h12v-5z"\/>[\s\n]*<path d="M10 17H5v5h5v-5zm7-7c0 3.3-2.7 6-6 6H7v2h4c4.4 0 8-3.6 8-8z"\/>[\s\n]*<\/svg>[\s\n]*TOILETS/g;
const newToiletBtn = `<img src="/toilet-icon.png" width="12" height="12" alt="toilet" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
                TOILETS`;
code = code.replace(toiletBtnRegex, newToiletBtn);

// Replace toilet getItemTheme SVG
const oldToiletTheme = `case 'toilet': 
          return { 
            color: '#0d9488', 
            bg: '#ccfbf1', 
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h8v3H6zm11 6c0-1.7-1.3-3-3-3H4c-1.1 0-2 .9-2 2v6h12v-5z"/><path d="M10 17H5v5h5v-5zm7-7c0 3.3-2.7 6-6 6H7v2h4c4.4 0 8-3.6 8-8z"/></svg> 
          };`;
const newToiletTheme = `case 'toilet': 
          return { 
            color: '#0d9488', 
            bg: '#ccfbf1', 
            icon: <img src="/toilet-icon.png" width="20" height="20" alt="toilet" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> 
          };`;

if (code.includes(oldToiletTheme)) {
    code = code.replace(oldToiletTheme, newToiletTheme);
} else {
    // If spaces mismatch
    const toiletThemeRegex = /case 'toilet':[\s\S]{10,250}bg: '#ccfbf1',[\s\S]{10,250}icon: <svg[\s\S]{10,400}<\/svg>[\s\S]{5,30}\};/;
    code = code.replace(toiletThemeRegex, newToiletTheme);
}

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Success Toilet");
