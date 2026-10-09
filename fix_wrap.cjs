const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

// We need to replace:
// <div className="text-[14px] font-bold truncate flex items-center gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
//   <div style={{ display: 'flex', alignItems: 'center' }}>
//     {theme.icon}
//   </div>
//   {loc.name}
// </div>

const targetRegex = /<div className="text-\[14px\] font-bold truncate flex items-center gap-\[7px\]" style=\{\{ color: isDarkMode \? '#d2b48c' : '#111827' \}\}>\s*<div style=\{\{ display: 'flex', alignItems: 'center' \}\}>\s*\{theme\.icon\}\s*<\/div>\s*\{loc\.name\}\s*<\/div>/;

const replacement = `<div className="text-[14px] font-bold flex items-start gap-[7px]" style={{ color: isDarkMode ? '#d2b48c' : '#111827' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '2px', flexShrink: 0 }}>
                  {theme.icon}
                </div>
                <div style={{ lineHeight: '1.3', wordBreak: 'break-word' }}>{loc.name}</div>
              </div>`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully replaced the search item text wrapping!");
} else {
    console.log("Could not find the target string.");
}

