const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Find: const categoryDisplay = loc.category ? `${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)}   ${loc.category}` : loc.type;
// Or something similar with dot/spaces.
const regex = /const categoryDisplay = loc\.category \? `\$\{loc\.type\.charAt\(0\)\.toUpperCase\(\) \+ loc\.type\.slice\(1\)\} [^`]+ \$\{loc\.category\}` : loc\.type;/;

const newContent = "const categoryDisplay = (loc.type === 'pandal' && loc.address) ? loc.address : (loc.category ? `${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)} • ${loc.category}` : loc.type);";

if (regex.test(content)) {
    content = content.replace(regex, newContent);
    console.log("Successfully updated categoryDisplay!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the target string!");
}
