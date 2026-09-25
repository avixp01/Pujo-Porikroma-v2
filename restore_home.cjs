const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `<div className="direction-list">
                {(() => {`;

const replacement = `<div className="direction-list">
              {/* Static Home Button */}
              <div className="direction-list-item">
                <div className="item-icon home"><Home size={20} /></div>
                <div className="item-content border-b">
                  <div className="item-title" style={{ color: isDarkMode ? '#f9fafb' : '#000000', fontSize: '16px', fontWeight: 'bold' }}>Home</div>
                  <div className="item-subtitle">Ichapur, Kolkata, West Bengal</div>
                </div>
              </div>
                {(() => {`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully added Home button back");
} else {
    console.log("Could not find the exact target string");
}
