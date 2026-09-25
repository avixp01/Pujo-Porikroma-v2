const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const logicTarget = `  const handleLocateClick = async (e) => {`;
const logicReplacement = `  const handleNavigateClick = async () => {
    if (isTracking && userLocation) {
      setIsDirectionPopupOpen(true);
      return;
    }
    
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        startTracking();
        setIsDirectionPopupOpen(true);
      } else {
        setShowLocationPopup(true);
      }
    } catch (err) {
      setShowLocationPopup(true);
    }
  };

  const handleLocateClick = async (e) => {`;

code = code.replace(logicTarget, logicReplacement);

const btnTarget = `<button className="btn-navigate" style={{ flex: (!selectedLocation || selectedLocation.type === 'pandal' || selectedLocation.type === 'train') ? undefined : 1 }}>`;
const btnReplacement = `<button className="btn-navigate" onClick={handleNavigateClick} style={{ flex: (!selectedLocation || selectedLocation.type === 'pandal' || selectedLocation.type === 'train') ? undefined : 1 }}>`;

code = code.replace(btnTarget, btnReplacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully added handleNavigateClick and wired to btn-navigate");
