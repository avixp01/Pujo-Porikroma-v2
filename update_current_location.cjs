const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Initial State
code = code.replace(
  /const \[originSearch, setOriginSearch\] = useState\("Your location"\);/g,
  'const [originSearch, setOriginSearch] = useState(""); // Will be set in useEffect'
);

// 2. The isDirectionPopupOpen useEffect
code = code.replace(
  /React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen\) \{\s*if \(navigationDestination\) \{\s*setOriginSearch\(isRouteSwapped \? navigationDestination\.name : \(customOrigin \? customOrigin\.name : "Your location"\)\);\s*setDestSearch\(isRouteSwapped \? \(customOrigin \? customOrigin\.name : "Your location"\) : navigationDestination\.name\);\s*\} else \{\s*setOriginSearch\(customOrigin \? customOrigin\.name : "Your location"\);\s*setDestSearch\(""\);\s*setActiveDirectionInput\('dest'\);\s*\}\s*\}\s*\}, \[isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped\]\);/,
  `React.useEffect(() => {
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
  }, [isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped, userLocation]);`
);

// 3. The route steps rendering (step-content)
code = code.replace(
  /\{isRouteSwapped \? navigationDestination\.name : "Your location"\}/g,
  '{isRouteSwapped ? navigationDestination.name : (userLocation ? "Current Location" : ".....")}'
);

code = code.replace(
  /\{isRouteSwapped \? "Your location" : navigationDestination\.name\}/g,
  '{isRouteSwapped ? (userLocation ? "Current Location" : ".....") : navigationDestination.name}'
);

// 4. Filter logic 
code = code.replace(
  /if \(filterText && filterText !== "Your location"\) \{/g,
  'if (filterText && filterText !== "Current Location" && filterText !== ".....") {'
);

// 5. Home static button reset
code = code.replace(
  /setOriginSearch\("Your location"\);/g,
  'setOriginSearch(userLocation ? "Current Location" : ".....");'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully updated Current Location logic.');
