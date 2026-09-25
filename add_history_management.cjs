const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const historyTarget = `  // --- Browser History Management for Modals ---`;
const historyReplacement = `  // --- Browser History Management for Modals ---
  React.useEffect(() => {
    if (isDirectionPopupOpen) {
      window.history.pushState({ id: 'direction' }, '');
    } else if (window.history.state?.id === 'direction') {
      window.history.back();
    }
  }, [isDirectionPopupOpen]);

  React.useEffect(() => {
    if (showUpdatePopup) {
      window.history.pushState({ id: 'update' }, '');
    } else if (window.history.state?.id === 'update') {
      window.history.back();
    }
  }, [showUpdatePopup]);`;
code = code.replace(historyTarget, historyReplacement);

const popstateTarget = `      const handlePopState = (e) => {
        const stateId = e.state?.id;
        if (stateId !== 'nearby' && isNearbyOpen) setIsNearbyOpen(false);
        if (stateId !== 'preview' && selectedLocation) setSelectedLocation(null);
        if (stateId !== 'location-popup' && showLocationPopup) setShowLocationPopup(false);
        if (stateId !== 'routes' && activeTab === 'routes') setActiveTab('map');
      };`;
const popstateReplacement = `      const handlePopState = (e) => {
        const stateId = e.state?.id;
        if (stateId !== 'nearby' && isNearbyOpen) setIsNearbyOpen(false);
        if (stateId !== 'preview' && selectedLocation) setSelectedLocation(null);
        if (stateId !== 'location-popup' && showLocationPopup) setShowLocationPopup(false);
        if (stateId !== 'routes' && activeTab === 'routes') setActiveTab('map');
        if (stateId !== 'direction' && isDirectionPopupOpen) setIsDirectionPopupOpen(false);
        if (stateId !== 'update' && showUpdatePopup) setShowUpdatePopup(false);
      };`;
code = code.replace(popstateTarget, popstateReplacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully added history management for direction and update popups");
