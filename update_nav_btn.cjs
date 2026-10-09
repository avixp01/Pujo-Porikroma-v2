const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `                    <button style={{ width: '100%', padding: '16px', backgroundColor: '#7c2d12', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} onClick={() => {
                      if (plannedStops.length > 0) {
                        setNavigationDestination(plannedStops[0]);
                        setActiveDirectionMode('car');
                        setIsDirectionPopupOpen(true);
                      }
                    }}>`;

const replaceStr = `                    <button style={{ width: '100%', padding: '16px', backgroundColor: '#7c2d12', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} onClick={() => {
                      if (plannedStops.length === 0) return;
                      if (!userLocation) {
                        setPendingLiveNavigation(true);
                        setShowLocationPopup(true);
                      } else {
                        setIsLiveNavigating(true);
                      }
                    }}>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log("Button updated successfully.");
} else {
  console.log("Button target string not found exactly.");
}
