const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<div className="direction-list">\s*\{\/\* Static Home Button \*\/\}\s*<div className="direction-list-item">\s*<div className="item-icon home"><Home size=\{20\} \/><\/div>\s*<div className="item-content border-b">\s*<div className="item-title" style=\{\{ color: isDarkMode \? '#f9fafb' : '#000000', fontSize: '16px', fontWeight: 'bold' \}\}>Home<\/div>\s*<div className="item-subtitle">Ichapur, Kolkata, West Bengal<\/div>\s*<\/div>\s*<\/div>\s*\{\(\(\) => \{/g;

const replacement = `{/* Static Home Button (Pinned) */}
            <div className="direction-list-item" style={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff', zIndex: 5, paddingBottom: 0 }}>
              <div className="item-icon home"><Home size={20} /></div>
              <div className="item-content border-b">
                <div className="item-title" style={{ color: isDarkMode ? '#f9fafb' : '#000000', fontSize: '16px', fontWeight: 'bold' }}>Home</div>
                <div className="item-subtitle">Ichapur, Kolkata, West Bengal</div>
              </div>
            </div>
            
            <div className="direction-list">
              {(() => {`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully pinned Home button outside scrollable list");
} else {
    console.log("Could not find the target string for pinning");
}
