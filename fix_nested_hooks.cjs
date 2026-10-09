const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex1 = /React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen && navigationDestination && \(userLocation \|\| customOrigin\)\) \{\s*React\.useEffect\(\(\) => \{\s*if \(isDirectionPopupOpen\) \{/;

const replacement1 = `React.useEffect(() => {
    if (isDirectionPopupOpen) {`;

const regex2 = /\}, \[isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped, userLocation\]\);\s*const fetchRouteData = async \(\) => \{/;

const replacement2 = `  }, [isDirectionPopupOpen, navigationDestination, customOrigin, isRouteSwapped, userLocation]);

  React.useEffect(() => {
    if (isDirectionPopupOpen && navigationDestination && (userLocation || customOrigin)) {
      const fetchRouteData = async () => {`;

if (regex1.test(code)) {
    code = code.replace(regex1, replacement1);
    code = code.replace(regex2, replacement2);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully patched hooks.");
} else {
    console.log("Regex 1 not found.");
}
