const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// I inserted this block:
/*
  const [minimapRouteCoords, setMinimapRouteCoords] = useState(null);

  React.useEffect(() => {
*/
code = code.replace(/React\.useEffect\(\(\) => \{\n    if \(plannedStops\.length > 0\)/g, 'useEffect(() => {\n    if (plannedStops.length > 0)');

fs.writeFileSync('src/components/MapPage.jsx', code);
