const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `<div className="walk-time">{Math.ceil(routeData.duration / 60)} min <span className="walk-dist">({(routeData.distance / 1000).toFixed(1)} km)</span></div>`;
const replacement = `<div className="walk-time">
                        {(() => {
                          const totalMins = Math.ceil(routeData.duration / 60);
                          return totalMins >= 60 ? \`\${Math.floor(totalMins / 60)} hr \${totalMins % 60} min\` : \`\${totalMins} min\`;
                        })()}
                        {' '}
                        <span className="walk-dist">({(routeData.distance / 1000).toFixed(1)} km)</span>
                      </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated duration formatting");
