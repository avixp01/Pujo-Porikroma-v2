const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetTileLayer = /<TileLayer\s+url=\{isDarkMode \? 'https:\/\/{s}\.basemaps\.cartocdn\.com\/dark_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png' : 'https:\/\/{s}\.basemaps\.cartocdn\.com\/light_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png'\}\s+attribution='&copy; CARTO'\s+\/>/g;

if (targetTileLayer.test(content)) {
    content = content.replace(targetTileLayer, `<TileLayer
                        url={isDarkMode ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\` : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`}
                        attribution='&copy; CARTO'
                      />`);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully restored the API key to the minimap!");
} else {
    console.log("Target TileLayer not found, checking alternatives...");
    // Fallback if formatting was slightly different
    const fallbackRegex = /<TileLayer\s+url=\{isDarkMode \? '[^']*' : '[^']*'\}\s+attribution='&copy; CARTO'\s+\/>/g;
    if (fallbackRegex.test(content)) {
        content = content.replace(fallbackRegex, `<TileLayer
                        url={isDarkMode ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\` : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`}
                        attribution='&copy; CARTO'
                      />`);
        fs.writeFileSync(file, content, 'utf8');
        console.log("Successfully restored the API key to the minimap (via fallback)!");
    }
}
