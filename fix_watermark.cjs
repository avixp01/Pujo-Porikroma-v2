const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `<MapContainer
                    center={plannedStops.length > 0 ? [plannedStops[0].lat, plannedStops[0].lng] : [22.5726, 88.3639]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    dragging={true}
                    scrollWheelZoom={false}
                  >`;
                  
const replaceStr = `<MapContainer
                    center={plannedStops.length > 0 ? [plannedStops[0].lat, plannedStops[0].lng] : [22.5726, 88.3639]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    dragging={true}
                    scrollWheelZoom={false}
                    attributionControl={false}
                  >`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/MapPage.jsx', code);
  console.log('done leaflet watermark');
} else {
    // maybe different line endings
    const targetStrLF = targetStr.replace(/\r\n/g, '\n');
    const replaceStrLF = replaceStr.replace(/\r\n/g, '\n');
    if (code.includes(targetStrLF)) {
        code = code.replace(targetStrLF, replaceStrLF);
        fs.writeFileSync('src/components/MapPage.jsx', code);
        console.log('done leaflet watermark LF');
    } else {
        console.log('not found');
    }
}
