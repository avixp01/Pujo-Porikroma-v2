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

const target1 = `<svg viewBox="0 0 24 24" width="24" height="24" fill="#cc5550">
                <path d="M12 4 L14 8 H10 Z" />
                <path d="M6 9 h12 v3 H6 Z" />
                <path d="M7 12 h2 v8 H7 Z" />
                <path d="M15 12 h2 v8 H15 Z" />
              </svg>`;
const target2 = `<svg viewBox="0 0 24 24" width="24" height="24" fill="#cc5550">
                      <path d="M12 4 L14 8 H10 Z" />
                    </svg>`;

code = code.replace(target1, dynamicIconCode);
code = code.replace(target2, dynamicIconCode);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated map popups with dynamic icons");
