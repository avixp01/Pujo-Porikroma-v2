const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetRegex = /<div className="text-\[12px\] truncate" style=\{\{ color: '#6b7280', marginTop: '2px', marginLeft: '23px' \}\}>/;
const replacement = `<div className="text-[12px]" style={{ color: '#6b7280', marginTop: '2px', marginLeft: '23px', lineHeight: '1.3', overflowWrap: 'break-word', wordBreak: 'normal' }}>`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully fixed subtitle wrapping!");
} else {
    console.log("Could not find the target string.");
}

