const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace the static 0 stops planned in the first header with the dynamic variable
content = content.replace(
    /<p className="routes-header-subtitle">Tonight \u2022 0 stops planned<\/p>/g,
    '<p className="routes-header-subtitle">Tonight \u2022 {plannedStops.length} stops planned</p>'
);

// 2. Remove the duplicate Header div inside routes-active-itinerary
// I will use regex to find and remove the duplicate header block
const duplicateHeaderRegex = /\{\/\* Header \*\/\}\s*<div style=\{\{\s*display:\s*'flex',\s*justifyContent:\s*'space-between',\s*alignItems:\s*'center',\s*padding:\s*'16px 16px 8px 16px',\s*backgroundColor:\s*'white'\s*\}\}>\s*<div>\s*<h2[^>]*>Your route<\/h2>\s*<p[^>]*>Tonight \u2022 \{plannedStops\.length\} stops planned<\/p>\s*<\/div>\s*<button[^>]*>\s*<svg[^>]*><circle[^>]*\/><circle[^>]*\/><circle[^>]*\/><\/svg>\s*<\/button>\s*<\/div>/;

if (duplicateHeaderRegex.test(content)) {
    content = content.replace(duplicateHeaderRegex, '');
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully fixed the route headers!");
} else {
    console.log("Could not find the duplicate header block to remove.");
    // Let's try a fallback string replace for the duplicate header just in case.
}
