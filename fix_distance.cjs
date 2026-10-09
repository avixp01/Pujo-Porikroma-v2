const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetRegex = /let distFormatted = distStr \? distStr\.replace\(' away', ''\) : '';\s*if \(\!distFormatted\) \{\s*const pseudoRandom = Math\.floor\(\(loc\.lat \+ loc\.lng\) \* 100000\) \% 950 \+ 50;\s*distFormatted = pseudoRandom < 1000 \? \`\$\{pseudoRandom\} m\` : \`\$\{\(pseudoRandom \/ 1000\)\.toFixed\(1\)\} km\`;\s*\}/;

const replacement = `let distFormatted = distStr ? distStr.replace(' away', '') : '...';`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully replaced distance logic!");
} else {
    console.log("Could not find the target string.");
}

