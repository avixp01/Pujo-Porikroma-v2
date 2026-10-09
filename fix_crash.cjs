const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `    React.useEffect(() => {
      if (isDirectionPopupOpen && navigationDestination && (userLocation || customOrigin)) {
        React.useEffect(() => {
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
    
    const fetchRouteData = async () => {`;

const replacementStr = `  React.useEffect(() => {
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
    if (isDirectionPopupOpen && navigationDestination && (userLocation || customOrigin)) {
      const fetchRouteData = async () => {`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Fixed nested useEffect successfully!');
} else {
  console.log('Target string not found, trying regex fallback...');
  // Fallback if whitespace is slightly different
  const regex = /React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen && navigationDestination && \(userLocation \|\| customOrigin\)\) \{\s*React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen\) \{\s*const defaultText = userLocation \? "Current Location" : "\.\.\.\.\.";\s*if \(navigationDestination\) \{\s*setOriginSearch\(isRouteSwapped \? navigationDestination\.name : \(customOrigin \? customOrigin\.name : defaultText\)\);\s*setDestSearch\(isRouteSwapped \? \(customOrigin \? customOrigin\.name : defaultText\) : navigationDestination\.name\);\s*\} else \{\s*setOriginSearch\(customOrigin \? customOrigin\.name : defaultText\);\s*setDestSearch\(""\);\s*setActiveDirectionInput\('dest'\);\s*\}\s*\}\s*\}, \[isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped, userLocation\]\);\s*const fetchRouteData = async \(\) => \{/;
  
  if (regex.test(code)) {
    code = code.replace(regex, replacementStr);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log('Fixed nested useEffect via regex successfully!');
  } else {
    console.log('Regex also failed. Please check the code.');
  }
}
