const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Injection 1: MiniMapBounds
const injectBoundsTarget = `const RecenterMap = ({ center, zoom }) => {`;
const injectBoundsCode = `const MiniMapBounds = ({ stops }) => {
  const map = useMap();
  useEffect(() => {
    if (stops && stops.length > 0) {
      const bounds = L.latLngBounds(stops.map(s => [s.lat, s.lon]));
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
    }
  }, [stops, map]);
  return null;
};

const RecenterMap = ({ center, zoom }) => {`;

if (code.includes(injectBoundsTarget)) {
  code = code.replace(injectBoundsTarget, injectBoundsCode);
  console.log('injected MiniMapBounds');
} else {
  console.log('failed to inject MiniMapBounds');
}

// Injection 2: Replace Minimap Placeholder
const placeholderRegex = /\{\/\* Minimap Placeholder \*\/\}\s*<div style=\{\{\s*height:\s*'180px',\s*backgroundColor:\s*'#e5e7eb',\s*width:\s*'100%',\s*position:\s*'relative'\s*\}\}>\s*<div style=\{\{\s*width:\s*'100%',\s*height:\s*'100%',\s*backgroundImage:\s*'url\(https:\/\/unpkg\.com\/leaflet@1\.9\.4\/dist\/images\/layers\.png\)',\s*backgroundSize:\s*'cover',\s*opacity:\s*0\.5\s*\}\}><\/div>\s*<div style=\{\{\s*position:\s*'absolute',\s*top:\s*'50%',\s*left:\s*'50%',\s*transform:\s*'translate\(-50%,\s*-50%\)',\s*backgroundColor:\s*'#7c2d12',\s*width:\s*'32px',\s*height:\s*'32px',\s*borderRadius:\s*'50%',\s*display:\s*'flex',\s*alignItems:\s*'center',\s*justifyContent:\s*'center',\s*border:\s*'3px solid white',\s*boxShadow:\s*'0 2px 4px rgba\(0,0,0,0\.2\)'\s*\}\}>\s*<img src="\/pandel-icon\.png" alt="pandal" style=\{\{\s*width:\s*"16px",\s*height:\s*"16px",\s*filter:\s*"invert\(1\)"\s*\}\}\s*\/>\s*<\/div>\s*<\/div>/;

const mapCode = `{/* Mini Map Route View */}
                <div style={{ height: '180px', width: '100%', position: 'relative' }}>
                  <MapContainer
                    center={plannedStops.length > 0 ? [plannedStops[0].lat, plannedStops[0].lon] : [22.5726, 88.3639]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    dragging={true}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      key={isDarkMode ? 'dark' : 'light'}
                      attribution=''
                      url={isDarkMode 
                        ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png\`
                        : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png\`
                      }
                    />
                    {plannedStops.map((stop, idx) => (
                      <Marker 
                        key={\`minimap-marker-\${idx}\`}
                        position={[stop.lat, stop.lon]}
                        icon={L.divIcon({
                          className: 'custom-div-icon',
                          html: \`<div style="background-color: #7c2d12; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3); font-size: 12px; font-weight: bold; color: white;">\${idx + 1}</div>\`,
                          iconSize: [24, 24],
                          iconAnchor: [12, 12]
                        })}
                      />
                    ))}
                    {plannedStops.length > 1 && (
                      <Polyline 
                        positions={plannedStops.map(s => [s.lat, s.lon])}
                        color="#7c2d12"
                        weight={3}
                        dashArray="5, 5"
                        opacity={0.7}
                      />
                    )}
                    <MiniMapBounds stops={plannedStops} />
                  </MapContainer>
                </div>`;

if (placeholderRegex.test(code)) {
  code = code.replace(placeholderRegex, mapCode);
  console.log('replaced Minimap Placeholder');
} else {
  console.log('failed to replace Minimap Placeholder');
}

fs.writeFileSync('src/components/MapPage.jsx', code);
console.log('done');
