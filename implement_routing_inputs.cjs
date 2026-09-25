const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Add state variables
code = code.replace(
  'const [isRouteSwapped, setIsRouteSwapped] = useState(false);',
  `const [isRouteSwapped, setIsRouteSwapped] = useState(false);
  const [customOrigin, setCustomOrigin] = useState(null);
  const [originSearch, setOriginSearch] = useState("Your location");
  const [destSearch, setDestSearch] = useState("");
  const [activeDirectionInput, setActiveDirectionInput] = useState('dest');`
);

// 2. Initialize inputs when popup opens
code = code.replace(
  /const fetchRouteData = async \(\) => \{/,
  `React.useEffect(() => {
    if (isDirectionPopupOpen) {
       if (navigationDestination) {
          setOriginSearch(isRouteSwapped ? navigationDestination.name : (customOrigin ? customOrigin.name : "Your location"));
          setDestSearch(isRouteSwapped ? (customOrigin ? customOrigin.name : "Your location") : navigationDestination.name);
       } else {
          setOriginSearch(customOrigin ? customOrigin.name : "Your location");
          setDestSearch("");
          setActiveDirectionInput('dest');
       }
    }
  }, [isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped]);
  
  const fetchRouteData = async () => {`
);

// 3. fetchRouteData
code = code.replace(
  /if \(isDirectionPopupOpen && navigationDestination && userLocation\) \{/,
  `if (isDirectionPopupOpen && navigationDestination && (userLocation || customOrigin)) {`
);

code = code.replace(
  /const startLat = isRouteSwapped \? navigationDestination\.lat : userLocation\[0\];[\s\S]*?const endLng = isRouteSwapped \? userLocation\[1\] : navigationDestination\.lng;/,
  `const originObj = isRouteSwapped ? navigationDestination : customOrigin;
            const destObj = isRouteSwapped ? customOrigin : navigationDestination;
            const startLat = originObj ? originObj.lat : (userLocation ? userLocation[0] : 22.5726);
            const startLng = originObj ? originObj.lng : (userLocation ? userLocation[1] : 88.3639);
            const endLat = destObj ? destObj.lat : (userLocation ? userLocation[0] : 22.5726);
            const endLng = destObj ? destObj.lng : (userLocation ? userLocation[1] : 88.3639);`
);

code = code.replace(
  /\}, \[isDirectionPopupOpen, navigationDestination, userLocation, isRouteSwapped\]\);/,
  `}, [isDirectionPopupOpen, navigationDestination, userLocation, isRouteSwapped, customOrigin]);`
);

// 4. Map Polylines (calculating startLat inside JSX)
code = code.replace(
  /return \(\n\s*<div className="map-page-wrapper"/,
  `
  const renderOriginObj = isRouteSwapped ? navigationDestination : customOrigin;
  const renderDestObj = isRouteSwapped ? customOrigin : navigationDestination;
  const renderStartLat = renderOriginObj ? renderOriginObj.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderStartLng = renderOriginObj ? renderOriginObj.lng : (userLocation ? userLocation[1] : 88.3639);
  const renderEndLat = renderDestObj ? renderDestObj.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderEndLng = renderDestObj ? renderDestObj.lng : (userLocation ? userLocation[1] : 88.3639);
  
  return (
    <div className="map-page-wrapper"`
);

// Polyline Train & Metro
code = code.replace(
  /\[\[isRouteSwapped \? navigationDestination\.lat : userLocation\[0\], isRouteSwapped \? navigationDestination\.lng : userLocation\[1\]\]/g,
  `[[renderStartLat, renderStartLng]]`
);
code = code.replace(
  /\[isRouteSwapped \? userLocation\[0\] : navigationDestination\.lat, isRouteSwapped \? userLocation\[1\] : navigationDestination\.lng\]\]/g,
  `[[renderEndLat, renderEndLng]]`
);

// 5. Direction Input Fields
code = code.replace(
  /<div className="direction-input-fields">[\s\S]*?<\/div>/,
  `<div className="direction-input-fields">
    <input type="text" className="direction-input" placeholder="Origin" 
      value={isRouteSwapped ? destSearch : originSearch} 
      onChange={(e) => {
        if (isRouteSwapped) {
           setDestSearch(e.target.value);
           setActiveDirectionInput('dest');
           if (navigationDestination) setNavigationDestination(null);
        } else {
           setOriginSearch(e.target.value);
           setActiveDirectionInput('origin');
           if (customOrigin) setCustomOrigin(null);
        }
      }}
      onFocus={() => setActiveDirectionInput(isRouteSwapped ? 'dest' : 'origin')}
    />
    <input type="text" className="direction-input" placeholder="Destination" 
      value={isRouteSwapped ? originSearch : destSearch} 
      onChange={(e) => {
        if (isRouteSwapped) {
           setOriginSearch(e.target.value);
           setActiveDirectionInput('origin');
           if (customOrigin) setCustomOrigin(null);
        } else {
           setDestSearch(e.target.value);
           setActiveDirectionInput('dest');
           if (navigationDestination) setNavigationDestination(null);
        }
      }}
      onFocus={() => setActiveDirectionInput(isRouteSwapped ? 'origin' : 'dest')}
    />
  </div>`
);

// 6. Direction Swap Button
code = code.replace(
  /setIsRouteSwapped\(prev => !prev\);\s*if \(navigationDestination && userLocation\) \{\s*setMapCenter\(isRouteSwapped \? \[userLocation\[0\], userLocation\[1\]\] : \[navigationDestination\.lat, navigationDestination\.lng\]\);\s*\}/,
  `setIsRouteSwapped(prev => !prev);
      const newOrigin = isRouteSwapped ? customOrigin : navigationDestination;
      if (newOrigin) {
         setMapCenter([newOrigin.lat, newOrigin.lng]);
      } else if (userLocation) {
         setMapCenter([userLocation[0], userLocation[1]]);
      }`
);

// 7. Direction List Click and Filter
// We also need to change the map check to conditionally render the map structure or the "no result" text.
// The easiest way is to let the IIFE return an array or JSX.
code = code.replace(
  /return \[\.\.\.locs\]\.sort\(\(a, b\) => \(a\.name \|\| ''\)\.localeCompare\(b\.name \|\| ''\)\);\s*\}\)\(\)\.map\(\(loc, index, arr\) => \(\s*<div className="direction-list-item" key=\{index\}>/g,
  `let sorted = [...locs].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                  const filterText = activeDirectionInput === 'origin' ? originSearch : destSearch;
                  if (filterText && filterText !== "Your location") {
                    const lower = filterText.toLowerCase();
                    sorted = sorted.filter(l => (l.name || '').toLowerCase().includes(lower));
                  }
                  return sorted;
                })().map((loc, index, arr) => (
                  <div className="direction-list-item" key={index} onClick={() => {
                        const targetInput = isRouteSwapped ? (activeDirectionInput === 'origin' ? 'dest' : 'origin') : activeDirectionInput;
                        if (targetInput === 'origin') {
                           setCustomOrigin(loc);
                           setOriginSearch(loc.name);
                        } else {
                           setNavigationDestination(loc);
                           setDestSearch(loc.name);
                        }
                    }}>`
);

// 7b. "No Result Found" injection
code = code.replace(
  /<div className="direction-list">\s*\{\(\(\) => \{/g,
  `<div className="direction-list">
                {(() => {
                  let locs = [];
                  if (activeDirectionMode === 'car') locs = allPujos;
                  else if (activeDirectionMode === 'bike') locs = allToilets;
                  else if (activeDirectionMode === 'train') locs = allMetros;
                  else if (activeDirectionMode === 'footprints') locs = allTrains;
                  let sorted = [...locs].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
                  const filterText = activeDirectionInput === 'origin' ? originSearch : destSearch;
                  if (filterText && filterText !== "Your location") {
                    const lower = filterText.toLowerCase();
                    sorted = sorted.filter(l => (l.name || '').toLowerCase().includes(lower));
                  }
                  if (sorted.length === 0) return <div style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '15px' }}>No result found</div>;
                  return null;
                })()}
                {(() => {`
);

// 8. Static Home Button Click
code = code.replace(
  /<div className="direction-list-item" style=\{\{ backgroundColor: isDarkMode \? '#121212' : '#ffffff', zIndex: 5, paddingBottom: 0 \}\}>/g,
  `<div className="direction-list-item" style={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff', zIndex: 5, paddingBottom: 0, cursor: 'pointer' }} onClick={() => {
    const targetInput = isRouteSwapped ? (activeDirectionInput === 'origin' ? 'dest' : 'origin') : activeDirectionInput;
    if (targetInput === 'origin') {
       setCustomOrigin(null);
       setOriginSearch("Your location");
    } else {
       if (userLocation) {
          setNavigationDestination({ name: 'Home', lat: userLocation[0], lng: userLocation[1], type: 'home' });
          setDestSearch('Home');
       }
    }
  }}>`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully implemented custom origin, destination typing, and list filtering.');
