const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen && navigationDestination && \(userLocation \|\| customOrigin\)\) \{\s*React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen\) \{/g;

const replacement = `React.useEffect(() => {
    if (isDirectionPopupOpen) {
       const defaultText = userLocation ? "Current Location" : ".....";
       if (navigationDestination) {
          setOriginSearch(isRouteSwapped ? navigationDestination.name : (customOrigin ? customOrigin.name : defaultText));
          setDestSearch(isRouteSwapped ? (customOrigin ? customOrigin.name : defaultText) : navigationDestination.name);
       } else {
          setOriginSearch(customOrigin ? customOrigin.name : defaultText);
          setDestSearch("");
          setActiveDirectionInput('dest');
       }
    }
  }, [isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped, userLocation]);

  React.useEffect(() => {
    if (isDirectionPopupOpen && navigationDestination && (userLocation || customOrigin)) {`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Fixed nested useEffect!");
} else {
    console.log("Could not find the nested useEffect!");
}
