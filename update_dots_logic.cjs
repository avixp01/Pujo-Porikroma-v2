const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

const oldDots = `<div className="pujo-theme-pagination">
                  <span className="dot active-dot"></span>
                    <span className="dot"></span>
                </div>`;

const newDots = `<div className="pujo-theme-pagination">
                  <span className={\`dot \${(cardImageIndexes[theme.id] || 0) === 0 ? 'active-dot' : ''}\`}></span>
                  <span className={\`dot \${(cardImageIndexes[theme.id] || 0) === 1 ? 'active-dot' : ''}\`}></span>
                </div>`;

code = code.replace(oldDots, newDots);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated pagination dots logic in JSX");
