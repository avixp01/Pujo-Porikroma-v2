const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Replace PANDALS filter button SVG
const pandalBtnRegex = /<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">[\s\n]*<path d="M12 2L2 12h3v10h14V12h3L12 2zm0 2\.8L18 10h-3v10H9V10H6l6-5\.2z"\/>[\s\n]*<path d="M11 2h2v4h-2z" \/>[\s\n]*<path d="M13 2l4 2-4 2z" \/>[\s\n]*<\/svg>[\s\n]*PANDALS/g;
const newPandalBtn = `<img src="/pandel-icon.png" width="12" height="12" alt="pandal" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />
                PANDALS`;
code = code.replace(pandalBtnRegex, newPandalBtn);

// 2. Replace PANDALS getItemTheme SVG
const oldPandalTheme = `case 'pandal': 
          return { 
            color: '#ef4444', 
            bg: '#fee2e2', 
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 12h3v10h14V12h3L12 2zm0 2.8L18 10h-3v10H9V10H6l6-5.2z"/><path d="M11 2h2v4h-2z" /><path d="M13 2l4 2-4 2z" /></svg> 
          };`;
const newPandalTheme = `case 'pandal': 
          return { 
            color: '#ef4444', 
            bg: '#fee2e2', 
            icon: <img src="/pandel-icon.png" width="20" height="20" alt="pandal" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> 
          };`;

if (code.includes(oldPandalTheme)) {
    code = code.replace(oldPandalTheme, newPandalTheme);
} else {
    // If there's some whitespace variance
    const pandalThemeRegex = /case 'pandal':[\s\S]{10,250}bg: '#fee2e2',[\s\S]{10,250}icon: <svg[\s\S]{10,400}<\/svg>[\s\S]{5,30}\};/;
    code = code.replace(pandalThemeRegex, newPandalTheme);
}

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Success Pandal");
