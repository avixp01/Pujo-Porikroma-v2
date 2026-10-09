const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /  return \(\r?\n    <div className=\{`map-page-container \$\{isDarkMode \? 'dark-mode' : ''\}`\}>/;

const safeInjection = `  const originObjForRender = isRouteSwapped ? navigationDestination : customOrigin;
  const destObjForRender = isRouteSwapped ? customOrigin : navigationDestination;
  const renderStartLat = originObjForRender ? originObjForRender.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderStartLng = originObjForRender ? originObjForRender.lng : (userLocation ? userLocation[1] : 88.3639);
  const renderEndLat = destObjForRender ? destObjForRender.lat : (userLocation ? userLocation[0] : 22.5726);
  const renderEndLng = destObjForRender ? destObjForRender.lng : (userLocation ? userLocation[1] : 88.3639);

  return (
    <div className={\`map-page-container \${isDarkMode ? 'dark-mode' : ''}\`}>`;

if (regex.test(code)) {
  code = code.replace(regex, safeInjection);
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Fixed');
} else {
  console.log('Not found');
}
