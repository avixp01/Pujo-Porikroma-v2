const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{\/\* Minimap Placeholder \*\/\}\s*<div style=\{\{ height: '180px', backgroundColor: '#e5e7eb', width: '100%', position: 'relative' \}\}>\s*<div style=\{\{ width: '100%', height: '100%', backgroundImage: 'url\(https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/images\/layers\.png\)', backgroundSize: 'cover', opacity: 0\.5 \}\}><\/div>\s*<div style=\{\{ position: 'absolute', top: '50%', left: '50%', transform: 'translate\(-50%, -50%\)', backgroundColor: '#7c2d12', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', boxShadow: '0 2px 4px rgba\(0,0,0,0\.2\)' \}\}>\s*<img src="\/pandel-icon\.png" alt="pandal" style=\{\{ width: "16px", height: "16px", filter: "invert\(1\)" \}\} \/>\s*<\/div>\s*<\/div>/g;

const replacementRender = `{/* Minimap */}
                  <div style={{ height: '180px', backgroundColor: '#e5e7eb', width: '100%', position: 'relative', zIndex: 1 }}>
                    <MapContainer
                      center={plannedStops.length > 0 ? plannedStops[0].position : [22.5726, 88.3639]}
                      zoom={12}
                      zoomControl={false}
                      attributionControl={false}
                      dragging={true}
                      scrollWheelZoom={false}
                      doubleClickZoom={false}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <TileLayer
                        url={isDarkMode ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'}
                      />
                      {plannedStops.length > 0 && <Polyline positions={plannedStops.map(s => s.position)} color="#7c2d12" weight={3} opacity={0.8} />}
                      {plannedStops.map((stop, idx) => (
                        <Marker 
                          key={idx}
                          position={stop.position}
                          icon={L.divIcon({
                            className: 'custom-route-marker',
                            html: \`<div style="background-color: white; width: 24px; height: 24px; border-radius: 50%; color: #111827; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; border: 2px solid \${idx === 0 ? '#10b981' : idx === plannedStops.length - 1 ? '#ef4444' : '#f59e0b'}; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">\${idx + 1}</div>\`,
                            iconSize: [24, 24],
                            iconAnchor: [12, 12]
                          })}
                        />
                      ))}
                      <MinimapBounds stops={plannedStops} />
                    </MapContainer>
                  </div>`;

if (regex.test(content)) {
    content = content.replace(regex, replacementRender);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully implemented interactive Minimap!");
} else {
    console.log("Regex failed to match Minimap Placeholder.");
}
