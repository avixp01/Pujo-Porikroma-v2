const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

const replacementStr = `    const handlePopState = (e) => {
      const mapSubStates = ['direction', 'update', 'nearby', 'preview', 'location-popup', 'routes'];
      if (!e.state || (e.state.id !== 'map' && !mapSubStates.includes(e.state.id))) {
        setShowMapPage(false);
        setIsMapLoading(false);
        setIsMapFadingOut(false);
      } else if (e.state && (e.state.id === 'map' || mapSubStates.includes(e.state.id))) {
        setShowMapPage(true);
      }
    };`;

code = code.replace(/const handlePopState = \(e\) => \{[\s\S]*?\}\s*else if \(e\.state && e\.state\.id === 'map'\) \{[\s\S]*?\}[\s\S]*?\};/, replacementStr);

fs.writeFileSync('src/App.jsx', code, 'utf8');
console.log("Updated App.jsx with regex.");
