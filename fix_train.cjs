const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const replacement = `{(() => {
              let nearestMetro = null;
              let metroDistText = "...";
              if (selectedLocation && formattedMetros && formattedMetros.length > 0) {
                let minDist = Infinity;
                formattedMetros.forEach(m => {
                  const d = getDistance(selectedLocation.lat, selectedLocation.lng, m.lat, m.lng);
                  if (d < minDist) {
                    minDist = d;
                    nearestMetro = m.name;
                  }
                });
                if (minDist !== Infinity) {
                    metroDistText = minDist < 1 ? \`\${Math.round(minDist * 1000)} m walk\` : \`\${minDist.toFixed(1)} km walk\`;
                }
              }

              let nearestTrain = null;
              let trainDistText = "...";
              if (selectedLocation && formattedTrains && formattedTrains.length > 0) {
                let minDist = Infinity;
                formattedTrains.forEach(t => {
                  const d = getDistance(selectedLocation.lat, selectedLocation.lng, t.lat, t.lng);
                  if (d < minDist) {
                    minDist = d;
                    nearestTrain = t.name;
                  }
                });
                if (minDist !== Infinity) {
                    trainDistText = minDist < 1 ? \`\${Math.round(minDist * 1000)} m walk\` : \`\${minDist.toFixed(1)} km walk\`;
                }
              }

              return (
                <>
                  <div className="preview-metro-info" style={{ marginBottom: "8px" }}>
                    <img src="/metro-icon.png" alt="metro" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
                    <span className="metro-name">{nearestMetro || "Metro Station"}</span> &bull; {metroDistText}
                  </div>
                  <div className="preview-metro-info">
                    <img src="/train-icon.png" alt="train" style={{ width: "16px", height: "16px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} />
                    <span className="metro-name">{nearestTrain || "Railway Station"}</span> &bull; {trainDistText}
                  </div>
                </>
              );
            })()}`;

const match = content.match(/\{\(\(\) => \{\s*let nearestMetro = null;[\s\S]*?\}\)\(\)\}/);
if (match) {
    content = content.replace(match[0], replacement);
    fs.writeFileSync(file, content);
    console.log("Successfully replaced via regex!");
} else {
    console.log("Could not find match via regex either.");
}

