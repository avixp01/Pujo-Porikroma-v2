const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetRegex = /const trainIconDark = new L\.Icon\(\{\s*iconUrl: '\/train-night\.png',\s*iconSize: \[44, 50\],\s*iconAnchor: \[22, 50\],\s*popupAnchor: \[0, -50\]\s*\}\);/;

const replacementStr = `const trainIconDark = new L.Icon({
              iconUrl: '/train-night.png',
              iconSize: [44, 50],
              iconAnchor: [22, 50],
              popupAnchor: [0, -50]
            });
            
            // 1.3x Selected versions of the icons
            const pandalIconBrightSelected = new L.Icon({
              iconUrl: '/pandal-pin4.png',
              iconSize: [62, 70],
              iconAnchor: [31, 70],
              popupAnchor: [0, -70]
            });
            const pandalIconDarkSelected = new L.Icon({
              iconUrl: '/pandel-pin6.png',
              iconSize: [62, 70],
              iconAnchor: [31, 70],
              popupAnchor: [0, -70]
            });
            const toiletIconBrightSelected = new L.Icon({
              iconUrl: '/toilet-day.png',
              iconSize: [62, 70],
              iconAnchor: [31, 70],
              popupAnchor: [0, -70]
            });
            const toiletIconDarkSelected = new L.Icon({
              iconUrl: '/toilet-night.png',
              iconSize: [62, 70],
              iconAnchor: [31, 70],
              popupAnchor: [0, -70]
            });
            const metroIconBrightSelected = new L.Icon({
              iconUrl: '/metro-day.png',
              iconSize: [62, 70],
              iconAnchor: [31, 70],
              popupAnchor: [0, -70]
            });
            const metroIconDarkSelected = new L.Icon({
              iconUrl: '/metro-night.png',
              iconSize: [62, 70],
              iconAnchor: [31, 70],
              popupAnchor: [0, -70]
            });
            const trainIconBrightSelected = new L.Icon({
              iconUrl: '/train-day.png',
              iconSize: [62, 70],
              iconAnchor: [31, 70],
              popupAnchor: [0, -70]
            });
            const trainIconDarkSelected = new L.Icon({
              iconUrl: '/train-night.png',
              iconSize: [62, 70],
              iconAnchor: [31, 70],
              popupAnchor: [0, -70]
            });`;

if (targetRegex.test(code)) {
    code = code.replace(targetRegex, replacementStr);
    
    // Now replace the map loop logic to use these pre-defined selected icons
    const mapRegex = /\{filteredData\.map\(loc => \{\s*let markerIcon;\s*if \(loc\.type === 'pandal'\) \{\s*markerIcon = isDarkMode \? pandalIconDark : pandalIconBright;\s*\} else if \(loc\.type === 'toilet'\) \{\s*markerIcon = isDarkMode \? toiletIconDark : toiletIconBright;\s*\} else if \(loc\.type === 'metro'\) \{\s*markerIcon = isDarkMode \? metroIconDark : metroIconBright;\s*\} else if \(loc\.type === 'train'\) \{\s*markerIcon = isDarkMode \? trainIconDark : trainIconBright;\s*\} else \{\s*markerIcon = createCustomIcon\(loc\.type, loc\.count\);\s*\}\s*return \(\s*<Marker/;

    const mapReplacementStr = `{filteredData.map(loc => {
                    let markerIcon;
                    const isSelected = selectedLocation && selectedLocation.id === loc.id;
                    
                    if (loc.type === 'pandal') {
                      markerIcon = isSelected 
                        ? (isDarkMode ? pandalIconDarkSelected : pandalIconBrightSelected)
                        : (isDarkMode ? pandalIconDark : pandalIconBright);
                    } else if (loc.type === 'toilet') {
                      markerIcon = isSelected 
                        ? (isDarkMode ? toiletIconDarkSelected : toiletIconBrightSelected)
                        : (isDarkMode ? toiletIconDark : toiletIconBright);
                    } else if (loc.type === 'metro') {
                      markerIcon = isSelected 
                        ? (isDarkMode ? metroIconDarkSelected : metroIconBrightSelected)
                        : (isDarkMode ? metroIconDark : metroIconBright);
                    } else if (loc.type === 'train') {
                      markerIcon = isSelected 
                        ? (isDarkMode ? trainIconDarkSelected : trainIconBrightSelected)
                        : (isDarkMode ? trainIconDark : trainIconBright);
                    } else {
                      // Custom clusters or other unscaled fallback
                      markerIcon = createCustomIcon(loc.type, loc.count);
                    }
                    
                    return (
                      <Marker`;
                      
    if (mapRegex.test(code)) {
        code = code.replace(mapRegex, mapReplacementStr);
        
        // Ensure zIndexOffset is also applied so the enlarged marker is on top
        code = code.replace(
          /position=\{\[loc\.lat, loc\.lng\]\}\s*eventHandlers=\{\{\s*click: \(\) => handleMarkerClick\(loc\)\s*\}\}/g,
          `position={[loc.lat, loc.lng]} 
                        zIndexOffset={isSelected ? 1000 : 0}
                        eventHandlers={{
                          click: () => handleMarkerClick(loc)
                        }}`
        );
        
        fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
        console.log('Successfully optimized selected marker size logic!');
    } else {
        console.log('Could not find the map loop to replace.');
    }
} else {
    console.log('Could not find the icon definitions to replace.');
}
