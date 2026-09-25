const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `<div className="transit-time">{Math.ceil((parseFloat(transitRouteData.walkToOriginDist) + parseFloat(transitRouteData.walkToDestDist))*15) + transitRouteData.trainDuration} min</div>`;
const replacement = `<div className="transit-time">
                        {(() => {
                          const totalMins = Math.ceil((parseFloat(transitRouteData.walkToOriginDist) + parseFloat(transitRouteData.walkToDestDist))*15) + transitRouteData.trainDuration;
                          return totalMins >= 60 ? \`\${Math.floor(totalMins / 60)} hr \${totalMins % 60} min\` : \`\${totalMins} min\`;
                        })()}
                      </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated transit duration formatting");
