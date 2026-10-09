const fs = require('fs');
let content = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `                <button className={\`btn-route \${plannedStops.find(s => s.id === selectedLocation?.id) ? 'added' : ''}\`} onClick={() => {
                    if (selectedLocation && selectedLocation.type !== 'train') {
                      if (!plannedStops.find(s => s.id === selectedLocation.id)) {`;

const replaceStr = `                <button className={\`btn-route \${plannedStops.find(s => s.id === selectedLocation?.id) ? 'added' : ''}\`} onClick={() => {
                    if (selectedLocation && selectedLocation.type === 'train') {
                      setShowTimetablePopup(true);
                    } else if (selectedLocation && selectedLocation.type !== 'train') {
                      if (!plannedStops.find(s => s.id === selectedLocation.id)) {`;

content = content.replace(targetStr, replaceStr);

fs.writeFileSync('src/components/MapPage.jsx', content, 'utf8');
console.log('Replaced successfully');
