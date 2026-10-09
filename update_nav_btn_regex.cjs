const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regexBtn = /<button style=\{\{\s*width: '100%',\s*padding: '16px',\s*backgroundColor: '#7c2d12',\s*color: 'white',\s*border: 'none',\s*borderRadius: '12px',\s*fontSize: '16px',\s*fontWeight: 'bold',\s*display: 'flex',\s*justifyContent: 'center',\s*alignItems: 'center',\s*gap: '8px',\s*cursor: 'pointer',\s*boxShadow: '0 4px 6px rgba\(0,0,0,0\.1\)'\s*\}\}\s*onClick=\{[\s\S]*?\}\s*>/;

const replaceStr = `<button style={{ width: '100%', padding: '16px', backgroundColor: '#7c2d12', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} onClick={() => {
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
