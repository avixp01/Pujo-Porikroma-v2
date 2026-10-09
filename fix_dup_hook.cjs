const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen && navigationDestination && \(userLocation \|\| customOrigin\)\) \{\s*const defaultText = userLocation \? "Current Location" : "\.\.\.\.\.";\s*if \(navigationDestination\) \{\s*setOriginSearch\(isRouteSwapped \? navigationDestination\.name : \(customOrigin \? customOrigin\.name : defaultText\)\);\s*setDestSearch\(isRouteSwapped \? \(customOrigin \? customOrigin\.name : defaultText\) : navigationDestination\.name\);\s*\} else \{\s*setOriginSearch\(customOrigin \? customOrigin\.name : defaultText\);\s*setDestSearch\(""\);\s*setActiveDirectionInput\('dest'\);\s*\}\s*\}\s*\}, \[isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped, userLocation\]\);\s*/g;

const replacement = `React.useEffect(() => {
    if (isDirectionPopupOpen && navigationDestination && (userLocation || customOrigin)) {
      `;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Removed duplicated lines!");
} else {
    console.log("Could not find the duplicate string!");
}
