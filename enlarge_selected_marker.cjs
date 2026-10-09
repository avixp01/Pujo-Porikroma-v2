const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetRegex = /\{filteredData\.map\(loc => \{\s*let markerIcon;\s*if \(loc\.type === 'pandal'\) \{\s*markerIcon = isDarkMode \? pandalIconDark : pandalIconBright;\s*\} else if \(loc\.type === 'toilet'\) \{\s*markerIcon = isDarkMode \? toiletIconDark : toiletIconBright;\s*\} else if \(loc\.type === 'metro'\) \{\s*markerIcon = isDarkMode \? metroIconDark : metroIconBright;\s*\} else if \(loc\.type === 'train'\) \{\s*markerIcon = isDarkMode \? trainIconDark : trainIconBright;\s*\} else \{\s*markerIcon = createCustomIcon\(loc\.type, loc\.count\);\s*\}\s*return \(\s*<Marker/;

const replacementStr = `{filteredData.map(loc => {
                    let markerIcon;
                    const isSelected = selectedLocation && selectedLocation.id === loc.id;
                    const size = isSelected ? [62, 70] : [44, 50];
                    const anchor = isSelected ? [31, 70] : [22, 50];
                    const popup = isSelected ? [0, -70] : [0, -50];
                    
                    if (loc.type === 'pandal') {
                      markerIcon = new L.Icon({ iconUrl: isDarkMode ? '/pandel-pin6.png' : '/pandal-pin4.png', iconSize: size, iconAnchor: anchor, popupAnchor: popup });
                    } else if (loc.type === 'toilet') {
                      markerIcon = new L.Icon({ iconUrl: isDarkMode ? '/toilet-night.png' : '/toilet-day.png', iconSize: size, iconAnchor: anchor, popupAnchor: popup });
                    } else if (loc.type === 'metro') {
                      markerIcon = new L.Icon({ iconUrl: isDarkMode ? '/metro-night.png' : '/metro-day.png', iconSize: size, iconAnchor: anchor, popupAnchor: popup });
                    } else if (loc.type === 'train') {
                      markerIcon = new L.Icon({ iconUrl: isDarkMode ? '/train-night.png' : '/train-day.png', iconSize: size, iconAnchor: anchor, popupAnchor: popup });
                    } else {
                      markerIcon = createCustomIcon(loc.type, loc.count);
                    }
                    
                    return (
                      <Marker`;

if (targetRegex.test(code)) {
  code = code.replace(targetRegex, replacementStr);
  
  // Now add zIndexOffset to the Marker
  code = code.replace(
    /position=\{\[loc\.lat, loc\.lng\]\}\s*eventHandlers=\{\{\s*click: \(\) => handleMarkerClick\(loc\)\s*\}\}/,
    `position={[loc.lat, loc.lng]} 
                        zIndexOffset={isSelected ? 1000 : 0}
                        eventHandlers={{
                          click: () => handleMarkerClick(loc)
                        }}`
  );
  
  fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
  console.log('Successfully updated selected marker size logic!');
} else {
  console.log('Could not find the target regex for marker map!');
}
