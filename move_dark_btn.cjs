const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Remove old Dark Mode button
const oldButtonRegex = /<button[\s\n]*onClick=\{\(\) => setIsDarkMode\(!isDarkMode\)\}[\s\S]*?<\/button>/;
code = code.replace(oldButtonRegex, '');

// 2. Replace Left Direction Button with Left Action Buttons container
const leftButtonRegex = /\{\/\* Left Direction Button \*\/\}[\s\S]*?<\/svg>[\s\n]*<\/button>[\s\n]*<\/div>/;

const newLeftButtons = `{/* Left Action Buttons */}
        <div style={{ 
          position: 'absolute', 
          bottom: '90px', 
          left: '16px', 
          zIndex: 1000, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px',
          pointerEvents: 'none' 
        }}>
          <button 
            className="map-action-btn"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="map-action-btn">
            <svg viewBox="0 0 24 24" width="22" height="22" fill={isDarkMode ? '#f9fafb' : 'black'}>
              <path d="M6 21 V11 a2 2 0 0 1 2-2 H13 V4 L19 10 L13 16 V11 H8 V21 Z" />
            </svg>
          </button>
        </div>`;

if (regexTest = leftButtonRegex.test(code)) {
    code = code.replace(leftButtonRegex, newLeftButtons);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully moved dark mode button");
} else {
    console.log("Left button regex failed");
}
