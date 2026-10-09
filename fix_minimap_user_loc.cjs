const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Find the minimap polyline block
const targetStr = `{plannedStops.length > 1 && (
                      <Polyline 
                        positions={plannedStops.map(s => [s.lat, s.lng])}
                        color="#7c2d12"
                        weight={3}
                        dashArray="5, 5"
                        opacity={0.7}
                      />
                    )}`;

const replaceStr = `{userLocation && (
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
                    {(plannedStops.length > 1 || (plannedStops.length > 0 && userLocation)) && (
                      <Polyline 
                        positions={userLocation ? [userLocation, ...plannedStops.map(s => [s.lat, s.lng])] : plannedStops.map(s => [s.lat, s.lng])}
                        color="#7c2d12"
                        weight={3}
                        dashArray="5, 5"
                        opacity={0.7}
                      />
                    )}`;

const safeReplace = (targetStr, replaceStr) => {
  const targetLF = targetStr.replace(/\r\n/g, '\n');
  const replaceLF = replaceStr.replace(/\r\n/g, '\n');
  if (code.includes(targetStr)) {
    code = code.replace(targetStr, replaceStr);
    console.log('done CRLF');
  } else if (code.includes(targetLF)) {
    code = code.replace(targetLF, replaceLF);
    console.log('done LF');
  } else {
    // If spaces or indentation differ, regex
    console.log('not found directly, trying regex');
    const regex = /\{plannedStops\.length > 1 && \(\s*<Polyline\s*positions=\{plannedStops\.map\(s => \[s\.lat, s\.lng\]\)\}\s*color="#7c2d12"\s*weight=\{3\}\s*dashArray="5, 5"\s*opacity=\{0\.7\}\s*\/>\s*\)\}/;
    if (regex.test(code)) {
        code = code.replace(regex, replaceStr);
        console.log('done regex');
    } else {
        console.log('completely not found');
    }
  }
};

safeReplace(targetStr, replaceStr);

// Also need to make sure MiniMapBounds includes userLocation
const minimapBoundsTarget = `<MiniMapBounds stops={plannedStops} />`;
const minimapBoundsReplace = `<MiniMapBounds stops={plannedStops} userLocation={userLocation} />`;

if (code.includes(minimapBoundsTarget)) {
    code = code.replace(minimapBoundsTarget, minimapBoundsReplace);
    console.log('replaced minimap bounds prop');
}

fs.writeFileSync('src/components/MapPage.jsx', code);
