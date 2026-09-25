const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `        {/* Nearby Floating Button */}
        <div className={\`map-nearby-btn-container \${(!selectedLocation && !isNearbyOpen) ? 'active' : ''}\`}>
          <button className="nearby-pill-btn" onClick={() => setIsNearbyOpen(true)}>
            <div className="nearby-icon-circle">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#cc5550">
                <path d="M12 4 L14 8 H10 Z" />
                <path d="M6 9 h12 v3 H6 Z" />
                <path d="M7 12 h2 v8 H7 Z" />
                <path d="M15 12 h2 v8 H15 Z" />
              </svg>
            </div>
            <div className="nearby-text-container">
              <div className="nearby-title">{userLocation ? \`\${nearbyPandals.length} pandals nearby\` : "5 pandals nearby"}</div>
              <div className="nearby-subtitle">Tap any pin to preview</div>
            </div>
          </button>
        </div>`;

if (code.includes(targetStr)) {
    code = code.replace(targetStr, '');
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Success");
} else {
    console.log("Not found! Trying Regex");
    const regex = /\{\/\* Nearby Floating Button \*\/\}[\s\S]*?<div className=\{`map-nearby-btn-container[\s\S]*?<\/div>[\s]*<\/div>/;
    if (regex.test(code)) {
        code = code.replace(regex, '');
        fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
        console.log("Success with Regex");
    } else {
        console.log("Regex failed too");
    }
}
