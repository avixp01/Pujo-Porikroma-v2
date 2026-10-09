const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `  return (
    <div className={\`map-page-container \${isDarkMode ? 'dark-mode' : ''}\`}>`;

const replacementStr = `  const renderOriginObj = isRouteSwapped ? navigationDestination : customOrigin;
  const renderDestObj = isRouteSwapped ? customOrigin : navigationDestination;
  const renderStartLat = renderOriginObj ? renderOriginObj.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderStartLng = renderOriginObj ? renderOriginObj.lng : (userLocation ? userLocation[1] : 88.3639);
  const renderEndLat = renderDestObj ? renderDestObj.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderEndLng = renderDestObj ? renderDestObj.lng : (userLocation ? userLocation[1] : 88.3639);

  return (
    <div className={\`map-page-container \${isDarkMode ? 'dark-mode' : ''}\`}>`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully injected renderStartLat and other coordinates!');
} else {
  console.log('Target string not found!');
}
