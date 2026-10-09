const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const injection = `  const originObj = isRouteSwapped ? navigationDestination : customOrigin;
  const destObj = isRouteSwapped ? customOrigin : navigationDestination;
  const renderStartLat = originObj ? originObj.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderStartLng = originObj ? originObj.lng : (userLocation ? userLocation[1] : 88.3639);
  const renderEndLat = destObj ? destObj.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderEndLng = destObj ? destObj.lng : (userLocation ? userLocation[1] : 88.3639);

  return (`;

// Only replace the FIRST occurrence (which is not guaranteed to be the main one, wait).
// Actually let's use a more specific target
const target = `  return (
    <div className={\`map-page-container \${isDarkMode ? 'dark-mode' : ''}\`}>`;

const safeInjection = `  const originObjForRender = isRouteSwapped ? navigationDestination : customOrigin;
  const destObjForRender = isRouteSwapped ? customOrigin : navigationDestination;
  const renderStartLat = originObjForRender ? originObjForRender.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderStartLng = originObjForRender ? originObjForRender.lng : (userLocation ? userLocation[1] : 88.3639);
  const renderEndLat = destObjForRender ? destObjForRender.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderEndLng = destObjForRender ? destObjForRender.lng : (userLocation ? userLocation[1] : 88.3639);

  return (
    <div className={\`map-page-container \${isDarkMode ? 'dark-mode' : ''}\`}>`;

if (code.includes(target)) {
  code = code.replace(target, safeInjection);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log("Successfully injected render variables.");
} else {
  console.log("Could not find the target string.");
}
