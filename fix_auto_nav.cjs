const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const trackingRegex = /navigator\.geolocation\.getCurrentPosition\(\(position\) => \{\s*setFollowingStatus\(true\);\s*setMapCenter\(\[position\.coords\.latitude, position\.coords\.longitude\]\);\s*setMapZoom\(17\);\s*\}, \(\) => \{\}, \{ enableHighAccuracy: true, timeout: 5000 \}\);/g;

const trackingReplacement = `navigator.geolocation.getCurrentPosition((position) => {
          setFollowingStatus(true);
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          setMapZoom(17);
          
          if (activeTab === 'routes' && plannedStops.length > 0) {
            setIsRouteNavigationOpen(true);
          }
        }, () => {}, { enableHighAccuracy: true, timeout: 5000 });`;

if (regexTest(trackingRegex, content)) {
    content = content.replace(trackingRegex, trackingReplacement);
    console.log("Updated startTracking to auto-open navigation!");
} else {
    console.log("Could not find startTracking logic!");
}

function regexTest(reg, c) {
    reg.lastIndex = 0;
    return reg.test(c);
}

fs.writeFileSync(file, content, 'utf8');
