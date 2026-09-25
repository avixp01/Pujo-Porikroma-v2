const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `        if (stateId !== 'nearby' && isNearbyOpen) setIsNearbyOpen(false);
        if (stateId !== 'preview' && selectedLocation) setSelectedLocation(null);
        if (stateId !== 'location-popup' && showLocationPopup) setShowLocationPopup(false);
        if (stateId !== 'routes' && activeTab === 'routes') setActiveTab('map');
      };`;

const replacementStr = `        if (stateId !== 'nearby' && isNearbyOpen) setIsNearbyOpen(false);
        if (stateId !== 'preview' && selectedLocation) setSelectedLocation(null);
        if (stateId !== 'location-popup' && showLocationPopup) setShowLocationPopup(false);
        if (stateId !== 'routes' && activeTab === 'routes') setActiveTab('map');
        if (stateId !== 'direction' && isDirectionPopupOpen) setIsDirectionPopupOpen(false);
      };`;

if(code.includes(targetStr)) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Updated handlePopState in MapPage.jsx");
} else {
    console.log("Could not find target string in MapPage.jsx");
}
