const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<MinimapBounds stops=\{plannedStops\} \/>/g;

const replacement = `{userLocation && (
                          <Marker 
                            position={userLocation}
                            icon={L.divIcon({
                              className: 'custom-user-marker',
                              html: \`<div class="user-location-dot"><div class="pulse"></div></div>\`,
                              iconSize: [24, 24],
                              iconAnchor: [12, 12]
                            })}
                          />
                        )}
                        <MinimapBounds stops={plannedStops} />`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Added user location marker to minimap!");
} else {
    console.log("Could not find the MinimapBounds tag!");
}
