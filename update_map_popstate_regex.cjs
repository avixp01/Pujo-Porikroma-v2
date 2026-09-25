const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

code = code.replace(
  /if \(stateId !== 'routes' && activeTab === 'routes'\) setActiveTab\('map'\);\s*\};/,
  `if (stateId !== 'routes' && activeTab === 'routes') setActiveTab('map');\n      if (stateId !== 'direction' && isDirectionPopupOpen) setIsDirectionPopupOpen(false);\n    };`
);
code = code.replace(
  /}, \[isNearbyOpen, selectedLocation, showLocationPopup, activeTab\]\);/g,
  `}, [isNearbyOpen, selectedLocation, showLocationPopup, activeTab, isDirectionPopupOpen]);`
);

// Also modify the back buttons to clear selectedLocation!
// Screenshot 1441 (Direction back button)
code = code.replace(
  /<button className="direction-back-btn" onClick=\{\(\) => setIsDirectionPopupOpen\(false\)\}>/,
  `<button className="direction-back-btn" onClick={() => { setIsDirectionPopupOpen(false); setSelectedLocation(null); }}>`
);

// Screenshot 1440 (MAP bottom nav button)
code = code.replace(
  /onClick=\{\(\) => setActiveTab\('map'\)\}/,
  `onClick={() => { setActiveTab('map'); setSelectedLocation(null); }}`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated MapPage.jsx");
