const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regexMapResizer = /const MapResizer = \(\) => \{/g;
if (!regexMapResizer.test(content)) {
    const mapResizerCode = `
const MapResizer = () => {
  const map = useMap();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};
`;
    content = content.replace('const MinimapController', mapResizerCode + '\nconst MinimapController');
}

const targetTag = `<MinimapController stops={plannedStops} userLocation={userLocation} />`;
if (content.includes(targetTag) && !content.includes('<MapResizer />')) {
    content = content.replace(targetTag, `${targetTag}\n                      <MapResizer />`);
}

// Remove the ?key= part from minimap to avoid any issues with env vars
const targetTileLayer = /<TileLayer\s+url=\{isDarkMode \? `https:\/\/{s}\.basemaps\.cartocdn\.com\/dark_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png\?key=\$\{import\.meta\.env\.VITE_CARTO_API_KEY \|\| 'cb1_2zpy_1_5578b74846ef709b32860fd7'}` : `https:\/\/{s}\.basemaps\.cartocdn\.com\/light_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png\?key=\$\{import\.meta\.env\.VITE_CARTO_API_KEY \|\| 'cb1_2zpy_1_5578b74846ef709b32860fd7'}`\}\s+attribution='&copy; CARTO'\s+\/>/g;

if (targetTileLayer.test(content)) {
    content = content.replace(targetTileLayer, `<TileLayer
                        url={isDarkMode ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
                        attribution='&copy; CARTO'
                      />`);
}

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully added MapResizer and cleaned TileLayer URL!");
