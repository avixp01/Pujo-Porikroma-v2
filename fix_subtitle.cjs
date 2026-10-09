const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetRegex = /const categoryDisplay = loc\.category \? \`\$\{loc\.type\.charAt\(0\)\.toUpperCase\(\) \+ loc\.type\.slice\(1\)\} . \$\{loc\.category\}\` : loc\.type;/;

const replacement = `const categoryDisplay = (loc.type === 'pandal' && loc.address) ? loc.address : (loc.category ? \`\${loc.type.charAt(0).toUpperCase() + loc.type.slice(1)} • \${loc.category}\` : loc.type);`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully replaced categoryDisplay logic!");
} else {
    console.log("Could not find the target string.");
}

