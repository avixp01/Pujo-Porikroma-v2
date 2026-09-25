const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /\)\}[\s\n]*\{\/\* Nearby Overlay & Bottom Sheet \*\/\}/;
const replacement = `)}
  
        {/* Left Direction Button */}
        <div style={{ position: 'absolute', bottom: '90px', left: '16px', zIndex: 1000, pointerEvents: 'auto' }}>
          <button className="map-action-btn">
            <svg viewBox="0 0 24 24" width="22" height="22" fill={isDarkMode ? '#f9fafb' : 'black'}>
              <path d="M5 22 V15 a8 8 0 0 1 8-8 H14 V3 L22 11 L14 19 V15 H13 V22 Z" />
            </svg>
          </button>
        </div>

        {/* Nearby Overlay & Bottom Sheet */}`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully added left direction button");
} else {
    console.log("Regex failed");
}
