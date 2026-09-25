const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const dynamicIconCode = `{selectedLocation?.type === 'toilet' ? (
                <img src="/toilet-icon.png" alt="toilet" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : selectedLocation?.type === 'metro' ? (
                <img src="/metro-icon.png" alt="metro" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : selectedLocation?.type === 'train' ? (
                <img src="/train-icon.png" alt="train" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              ) : (
                <img src="/pandel-icon.png" alt="pandal" style={{ width: "24px", height: "24px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
              )}`;

// Replace first instance
code = code.replace(/<div className="preview-icon-box">\s*<svg viewBox="0 0 24 24" width="24" height="24" fill="#cc5550">[\s\S]*?<\/svg>\s*<\/div>/, '<div className="preview-icon-box">\n' + dynamicIconCode + '\n</div>');

// Replace second instance
code = code.replace(/<div className="preview-icon-box">\s*<svg viewBox="0 0 24 24" width="24" height="24" fill="#cc5550">[\s\S]*?<\/svg>\s*<\/div>/, '<div className="preview-icon-box">\n' + dynamicIconCode + '\n</div>');


fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated map popups with regex");
