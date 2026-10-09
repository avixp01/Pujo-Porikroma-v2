const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetRegex = /<svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">[\s\S]*?<\/svg>/;
const replacement = `<img src="/metro-icon.png" alt="metro" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully replaced metro SVG with metro-icon.png!");
} else {
    console.log("SVG not found.");
}

