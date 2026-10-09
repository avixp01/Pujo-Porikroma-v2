const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Move it down
const blockToMove = `
    const [isRouteNavigationOpen, setIsRouteNavigationOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);

    React.useEffect(() => {
      if (userLocation && pendingAction === 'route_navigation') {
        setIsRouteNavigationOpen(true);
        setPendingAction(null);
      }
    }, [userLocation, pendingAction]);`;

if (content.includes(blockToMove)) {
    content = content.replace(blockToMove, `
    const [isRouteNavigationOpen, setIsRouteNavigationOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);`);
    
    // insert useEffect after userLocation
    const userLocLine = `const [userLocation, setUserLocation] = useState(null);`;
    if (content.includes(userLocLine)) {
        content = content.replace(userLocLine, `${userLocLine}\n
    React.useEffect(() => {
      if (userLocation && pendingAction === 'route_navigation') {
        setIsRouteNavigationOpen(true);
        setPendingAction(null);
      }
    }, [userLocation, pendingAction]);`);
        fs.writeFileSync(file, content, 'utf8');
        console.log("Successfully moved useEffect down!");
    } else {
        console.log("userLocation not found");
    }
} else {
    console.log("blockToMove not found");
}
