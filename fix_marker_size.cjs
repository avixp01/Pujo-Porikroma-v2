const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const isSelected = selectedLocation && selectedLocation\.id === loc\.id;\s*if \(isSelected && markerIcon\) \{\s*const iconOpts = \{ \.\.\.markerIcon\.options \};\s*iconOpts\.className = \(iconOpts\.className || ''\) \+ ' selected-marker-scale';\s*if \(markerIcon instanceof L\.DivIcon\) \{\s*markerIcon = new L\.DivIcon\(iconOpts\);\s*\} else \{\s*markerIcon = new L\.Icon\(iconOpts\);\s*\}\s*\}/g;

const replacement = `const isSelected = selectedLocation && selectedLocation.id === loc.id;
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
                    }`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Updated to use iconSize scaling instead of CSS class!");
} else {
    console.log("Could not find the logic to replace!");
}
