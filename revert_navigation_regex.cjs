const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetUseEffect = /const \[minimapRouteCoords, setMinimapRouteCoords\] = useState\(null\);\s*useEffect\(\(\) => \{\s*if \(plannedStops\.length > 0\) \{\s*const fetchMinimapRoute = async \(\) => \{[\s\S]*?\} else \{\s*setMinimapRouteCoords\(null\);\s*\}\s*\}, \[plannedStops, userLocation\]\);/;

const targetPolyline = /\{\(plannedStops\.length > 1 \|\| \(plannedStops\.length > 0 && userLocation\)\) && \(\s*<Polyline\s*positions=\{minimapRouteCoords \? minimapRouteCoords : \(userLocation \? \[userLocation, \.\.\.plannedStops\.map\(s => \[s\.lat, s\.lng\]\)\] : plannedStops\.map\(s => \[s\.lat, s\.lng\]\)\)\}\s*color=\{minimapRouteCoords \? "#3b82f6" : "#7c2d12"\}\s*weight=\{minimapRouteCoords \? 5 : 3\}\s*dashArray=\{minimapRouteCoords \? "none" : "5, 5"\}\s*opacity=\{0\.8\}\s*\/>\s*\)\}/;

const replacePolyline = `{(plannedStops.length > 1 || (plannedStops.length > 0 && userLocation)) && (
                        <Polyline 
                          positions={userLocation ? [userLocation, ...plannedStops.map(s => [s.lat, s.lng])] : plannedStops.map(s => [s.lat, s.lng])}
                          color="#7c2d12"
                          weight={3}
                          dashArray="5, 5"
                          opacity={0.7}
                        />
                      )}`;

if (targetUseEffect.test(code) && targetPolyline.test(code)) {
  code = code.replace(targetUseEffect, '');
  code = code.replace(targetPolyline, replacePolyline);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('Reverted turn-by-turn navigation successfully.');
} else {
  console.log('Targets not found!');
  if (!targetUseEffect.test(code)) console.log('targetUseEffect missing');
  if (!targetPolyline.test(code)) console.log('targetPolyline missing');
}
