const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const oldCode = `if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                        setPlannedStops([...plannedStops, selectedLocation]);
                      } else {`;

const newCode = `if (!plannedStops.find(s => s.id === selectedLocation.id)) {
                        setPlannedStops([...plannedStops, selectedLocation]);
                        setActiveTab('routes');
                      } else {`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Updated btn-route click handler");
