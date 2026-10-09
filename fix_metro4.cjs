const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const replacement = `{(() => {
              let nearestMetro = null;
              let distText = "...";
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
                    distText = minDist < 1 ? \`\${Math.round(minDist * 1000)} m walk\` : \`\${minDist.toFixed(1)} km walk\`;
                }
              }

              return (
                <div className="preview-metro-info">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">
                    <path d="M12 2C8 2 4 5 4 9v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-4-4-7-8-7zm0 2c3.3 0 6 2.2 6 5H6c0-2.8 2.7-5 6-5zm-3 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                    <path d="M6 19v3h2v-3H6zm10 0v3h2v-3h-2z" />
                  </svg>
                  <span className="metro-name">{nearestMetro || "Metro Station"}</span> &bull; {distText}
                </div>
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

