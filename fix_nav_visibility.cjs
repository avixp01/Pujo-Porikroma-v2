const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix Z-index of the navigation popup
const zIndexRegex = /<div style=\{\{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column' \}\}>/g;
if (regexTest(zIndexRegex, content)) {
    content = content.replace(zIndexRegex, `<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>`);
    console.log("Updated zIndex to 9999!");
}

// 2. Fix onClick logic to handle Safari / iOS gracefully without throwing
const onClickRegex = /onClick=\{async \(\) => \{\s*if \(plannedStops\.length === 0\) return;\s*if \(isTracking && userLocation\) \{\s*setIsRouteNavigationOpen\(true\);\s*return;\s*\}\s*try \{\s*const result = await navigator\.permissions\.query\(\{ name: 'geolocation' \}\);\s*if \(result\.state === 'granted'\) \{\s*startTracking\(\);\s*setIsRouteNavigationOpen\(true\);\s*\} else \{\s*setShowLocationPopup\(true\);\s*\}\s*\} catch \(err\) \{\s*setShowLocationPopup\(true\);\s*\}\s*\}\}/g;

const newOnClick = `onClick={() => {
                        if (plannedStops.length === 0) return;
                        if (isTracking && userLocation) {
                          setIsRouteNavigationOpen(true);
                          return;
                        }
                        
                        // Use standard geolocation API for wider browser support (Safari)
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const newLoc = [position.coords.latitude, position.coords.longitude];
                              setUserLocation(newLoc);
                              setMapCenter(newLoc);
                              startTracking();
                              setIsRouteNavigationOpen(true);
                            },
                            (error) => {
                              setShowLocationPopup(true);
                            },
                            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                          );
                        } else {
                          setShowLocationPopup(true);
                        }
                      }}`;

if (regexTest(onClickRegex, content)) {
    content = content.replace(onClickRegex, newOnClick);
    console.log("Updated onClick to be Safari-safe!");
} else {
    console.log("Could not find the onClick logic!");
}

function regexTest(reg, c) {
    reg.lastIndex = 0;
    return reg.test(c);
}

fs.writeFileSync(file, content, 'utf8');
