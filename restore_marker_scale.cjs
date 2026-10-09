const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{\s*markerIcon = createCustomIcon\(loc\.type, loc\.count\);\s*\}\s*return \(\s*<Marker/g;

const replacement = `{
                        markerIcon = createCustomIcon(loc.type, loc.count);
                      }
                      
                      const isSelected = selectedLocation && selectedLocation.id === loc.id;
                      if (isSelected && markerIcon) {
                        const iconOpts = { ...markerIcon.options };
                        
                        if (iconOpts.iconSize) {
                          iconOpts.iconSize = [iconOpts.iconSize[0] * 1.3, iconOpts.iconSize[1] * 1.3];
                        }
                        if (iconOpts.iconAnchor) {
                          iconOpts.iconAnchor = [iconOpts.iconAnchor[0] * 1.3, iconOpts.iconAnchor[1] * 1.3];
                        }
                        
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
    console.log("Restored marker scaling logic cleanly!");
} else {
    console.log("Could not find the logic to replace!");
}
