const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

const targetStr = `      const handlePopState = (e) => {
        if (!e.state || e.state.id !== 'map') {
          setShowMapPage(false);
          setIsMapLoading(false);
          setIsMapFadingOut(false);
        } else if (e.state && e.state.id === 'map') {
          setShowMapPage(true);
        }
      };`;

const replacementStr = `      const handlePopState = (e) => {
        const mapSubStates = ['direction', 'update', 'nearby', 'preview', 'location-popup', 'routes'];
        if (!e.state || (e.state.id !== 'map' && !mapSubStates.includes(e.state.id))) {
          setShowMapPage(false);
          setIsMapLoading(false);
          setIsMapFadingOut(false);
        } else if (e.state && (e.state.id === 'map' || mapSubStates.includes(e.state.id))) {
          setShowMapPage(true);
        }
      };`;

if(code.includes(targetStr)) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('src/App.jsx', code, 'utf8');
    console.log("Updated App.jsx history logic.");
} else {
    console.log("Could not find target string in App.jsx.");
}
