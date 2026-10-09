const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetRegex = /return \(\s*<>\s*<div className="preview-metro-info" style=\{\{ marginBottom: "0px" \}\}>\s*<img src="\/metro-icon\.png" alt="metro" style=\{\{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode \? "invert\(1\)" : "none" \}\} \/>\s*<span className="metro-name">\{nearestMetro \|\| "Metro Station"\}<\/span> \&bull; \{metroDistText\}\s*<\/div>\s*<div className="preview-metro-info">\s*<img src="\/train-icon\.png" alt="train" style=\{\{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode \? "invert\(1\)" : "none" \}\} \/>\s*<span className="metro-name">\{nearestTrain \|\| "Railway Station"\}<\/span> \&bull; \{trainDistText\}\s*<\/div>\s*<\/>\s*\);/;

const replacement = `return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div className="preview-metro-info" style={{ marginBottom: "0px" }}>
                      <img src="/metro-icon.png" alt="metro" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
                      <span className="metro-name">{nearestMetro || "Metro Station"}</span> &bull; {metroDistText}
                    </div>
                    <div className="preview-metro-info">
                      <img src="/train-icon.png" alt="train" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
                      <span className="metro-name">{nearestTrain || "Railway Station"}</span> &bull; {trainDistText}
                    </div>
                  </div>
                  <button onClick={() => setShowUpdatePopup(true)} style={{ background: 'none', border: 'none', color: '#16a34a', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', paddingRight: '16px' }}>
                    Visited
                  </button>
                </div>
              );`;

if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully added Visited button!");
} else {
    console.log("Could not find the target string.");
}

