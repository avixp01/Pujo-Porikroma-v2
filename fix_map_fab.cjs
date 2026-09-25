const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `<button className="map-action-btn" onClick={() => setIsDirectionPopupOpen(true)}>`;

const replacementStr = `<button className="map-action-btn" onClick={() => { setNavigationDestination(null); setIsRouteSwapped(false); setIsDirectionPopupOpen(true); }}>`;

if (mapPageCode.includes(targetStr)) {
  mapPageCode = mapPageCode.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
  console.log('Successfully updated the map-action-btn onClick handler.');
} else {
  console.log('Target string not found in MapPage.jsx');
}
