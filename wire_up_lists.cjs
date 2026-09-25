const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetRegex = /\{\/\* List \*\/\}\s*<div className="direction-list">[\s\S]*?<\/div>\s*<\/div>\s*\)\}\s*<\/div>/;

const newBlock = `{/* List */}
            <div className="direction-list">
              {(() => {
                let locs = [];
                if (activeDirectionMode === 'car') locs = allPujos;
                else if (activeDirectionMode === 'bike') locs = allToilets;
                else if (activeDirectionMode === 'train') locs = allMetros;
                else if (activeDirectionMode === 'footprints') locs = allTrains;
                return [...locs].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
              })().map((loc, index, arr) => (
                <div className="direction-list-item" key={index}>
                  <div className="item-icon">
                    {activeDirectionMode === 'car' && <img src="/pandel-icon.png" style={{ width: "20px", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="pandal" />}
                    {activeDirectionMode === 'bike' && <img src="/toilet-icon.png" style={{ width: "20px", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="toilet" />}
                    {activeDirectionMode === 'train' && <img src="/metro-icon.png" style={{ width: "20px", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="metro" />}
                    {activeDirectionMode === 'footprints' && <img src="/train-icon.png" style={{ width: "20px", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="train" />}
                  </div>
                  <div className={\`item-content \${index !== arr.length - 1 ? 'border-b' : ''}\`}>
                    <div className="item-title" style={{ color: isDarkMode ? '#f9fafb' : '#000000', fontSize: '16px', fontWeight: 'bold' }}>{loc.name}</div>
                    <div className="item-subtitle">{loc.address || 'Kolkata, West Bengal'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>`;

if (targetRegex.test(code)) {
    code = code.replace(targetRegex, newBlock);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully replaced list with dynamic alphabetical mapping");
} else {
    console.log("Could not find the target list block");
}
