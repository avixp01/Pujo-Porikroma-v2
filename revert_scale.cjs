const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const isSelected = selectedLocation && selectedLocation\.id === loc\.id;\s*if \(isSelected && markerIcon\) \{\s*const iconOpts = \{ \.\.\.markerIcon\.options \};\s*if \(iconOpts\.iconSize\) \{\s*iconOpts\.iconSize = \[iconOpts\.iconSize\[0\] \* 1\.3, iconOpts\.iconSize\[1\] \* 1\.3\];\s*\}\s*if \(iconOpts\.iconAnchor\) \{\s*iconOpts\.iconAnchor = \[iconOpts\.iconAnchor\[0\] \* 1\.3, iconOpts\.iconAnchor\[1\] \* 1\.3\];\s*\}\s*if \(markerIcon instanceof L\.DivIcon\) \{\s*markerIcon = new L\.DivIcon\(iconOpts\);\s*\} else \{\s*markerIcon = new L\.Icon\(iconOpts\);\s*\}\s*\}/g;

const replacement = ``;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Reverted marker scaling logic successfully!");
} else {
    console.log("Could not find the logic to revert!");
}
