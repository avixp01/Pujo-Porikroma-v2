const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{filteredData\.map\(loc => \{\s*let markerIcon;\s*if \(loc\.type === 'pandal'\) \{\s*markerIcon = isDarkMode \? pandalIconDark : pandalIconBright;\s*\} else if \(loc\.type === 'toilet'\) \{\s*markerIcon = isDarkMode \? toiletIconDark : toiletIconBright;\s*\} else if \(loc\.type === 'metro'\) \{\s*markerIcon = isDarkMode \? metroIconDark : metroIconBright;\s*\} else if \(loc\.type === 'train'\) \{\s*markerIcon = isDarkMode \? trainIconDark : trainIconBright;\s*\} else \{\s*markerIcon = createCustomIcon\(loc\.type, loc\.count\);\s*\}\s*return \(\s*<Marker/g;

const replacement = `{filteredData.map(loc => {
                    let markerIcon;
                    if (loc.type === 'pandal') {
                      markerIcon = isDarkMode ? pandalIconDark : pandalIconBright;
                    } else if (loc.type === 'toilet') {
                      markerIcon = isDarkMode ? toiletIconDark : toiletIconBright;
                    } else if (loc.type === 'metro') {
                      markerIcon = isDarkMode ? metroIconDark : metroIconBright;
                    } else if (loc.type === 'train') {
                      markerIcon = isDarkMode ? trainIconDark : trainIconBright;
                    } else {
                      markerIcon = createCustomIcon(loc.type, loc.count);
                    }
                    
                    const isSelected = selectedLocation && selectedLocation.id === loc.id;
                    if (isSelected && markerIcon) {
                      const iconOpts = { ...markerIcon.options };
                      iconOpts.className = (iconOpts.className || '') + ' selected-marker-animation';
                      if (markerIcon instanceof L.DivIcon) {
                        markerIcon = new L.DivIcon(iconOpts);
                      } else {
                        markerIcon = new L.Icon(iconOpts);
                      }
                    }
                    
                    return (
                      <Marker`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Applied marker animation logic!");
} else {
    console.log("Could not find the map function to replace!");
}
