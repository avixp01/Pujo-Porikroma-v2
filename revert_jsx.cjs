const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /const isSelected = selectedLocation && selectedLocation\.id === loc\.id;\s*if \(isSelected && markerIcon\) \{\s*const iconOpts = \{ \.\.\.markerIcon\.options \};\s*iconOpts\.className = \(iconOpts\.className || ''\) \+ ' selected-marker-animation';\s*if \(markerIcon instanceof L\.DivIcon\) \{\s*markerIcon = new L\.DivIcon\(iconOpts\);\s*\} else \{\s*markerIcon = new L\.Icon\(iconOpts\);\s*\}\s*\}/g;

const replacement = ``;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Reverted marker animation logic in JSX!");
} else {
    console.log("Could not find the logic to revert!");
}
