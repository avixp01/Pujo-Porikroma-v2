const fs = require('fs');
let content = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const stateTarget = `const [isDirectionPopupOpen, setIsDirectionPopupOpen] = useState(false);`;
const replacement = `${stateTarget}\n  const [isRouteNavigationOpen, setIsRouteNavigationOpen] = useState(false);\n  const [pendingAction, setPendingAction] = useState(null);\n\n  React.useEffect(() => {\n    if (userLocation && pendingAction === 'route_navigation') {\n      setIsRouteNavigationOpen(true);\n      setPendingAction(null);\n    }\n  }, [userLocation, pendingAction]);`;

if (content.includes(stateTarget) && !content.includes('const [isRouteNavigationOpen')) {
    content = content.replace(stateTarget, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', content, 'utf8');
    console.log("Restored nav state hooks!");
} else {
    console.log("Hooks already present or target not found.");
}
