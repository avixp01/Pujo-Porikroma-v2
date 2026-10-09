const fs = require('fs');

const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove the misplaced useEffect
const badEffectRegex = /\s*React\.useEffect\(\(\) => \{\s*if \(userLocation && pendingAction === 'route_navigation'\) \{\s*setIsRouteNavigationOpen\(true\);\s*setPendingAction\(null\);\s*\}\s*\}, \[userLocation, pendingAction\]\);/g;
if (badEffectRegex.test(content)) {
    content = content.replace(badEffectRegex, '');
    console.log("Removed bad useEffect");
}

// 2. Insert it AFTER userLocation
const targetLine = "const [userLocation, setUserLocation] = useState(null);";
const replacementLine = `${targetLine}\n  React.useEffect(() => {\n    if (userLocation && pendingAction === 'route_navigation') {\n      setIsRouteNavigationOpen(true);\n      setPendingAction(null);\n    }\n  }, [userLocation, pendingAction]);`;

if (content.includes(targetLine)) {
    content = content.replace(targetLine, replacementLine);
    console.log("Inserted good useEffect");
}

fs.writeFileSync(file, content, 'utf8');
