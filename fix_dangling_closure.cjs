const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /fetchRouteData\(\);\s*\}\s*\}, \[isDirectionPopupOpen, navigationDestination, userLocation, isRouteSwapped, customOrigin\]\);/;

if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Fixed syntax error by removing dangling useEffect closure!");
} else {
    console.log("Could not find the dangling closure!");
}
