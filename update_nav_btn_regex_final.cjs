const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regexBtn = /<button className="start-nav-fab" style=\{\{[\s\S]*?\}\} onClick=\{[\s\S]*?\}\s*>/;

const replaceStr = `<button className="start-nav-fab" style={{ width: '100%', backgroundColor: '#7c2d12', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', boxShadow: '0 8px 24px rgba(124, 45, 18, 0.4)', gap: '8px' }} onClick={() => {
                      if (plannedStops.length === 0) return;
                      if (!userLocation) {
                        setPendingLiveNavigation(true);
                        setShowLocationPopup(true);
                      } else {
                        setIsLiveNavigating(true);
                      }
                    }}>`;

if (regexBtn.test(code)) {
  code = code.replace(regexBtn, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log("Button updated successfully with regex.");
} else {
  console.log("Button regex target not found either.");
}
