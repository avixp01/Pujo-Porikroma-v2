const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetLayer = `<TileLayer
                        url={isDarkMode ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
                      />`;

const replacementLayer = `<TileLayer
                        url={isDarkMode ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\` : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`}
                        attribution='&copy; CARTO'
                      />`;

if (content.includes(targetLayer)) {
    content = content.replace(targetLayer, replacementLayer);
    
    // Also include userLocation in the polyline
    const targetPoly = `{plannedStops.length > 0 && <Polyline positions={plannedStops.map(s => s.position)} color="#7c2d12" weight={3} opacity={0.8} />}`;
    const replacementPoly = `{plannedStops.length > 0 && <Polyline positions={userLocation ? [userLocation, ...plannedStops.map(s => s.position)] : plannedStops.map(s => s.position)} color="#7c2d12" weight={3} opacity={0.8} dashArray="5, 10" />}`;
    
    if (content.includes(targetPoly)) {
        content = content.replace(targetPoly, replacementPoly);
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully fixed TileLayer URL and Polyline!");
} else {
    console.log("Target TileLayer not found.");
}
