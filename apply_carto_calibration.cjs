const fs = require('fs');

const files = [
  'src/data/trains-batch1.js',
  'src/data/trains-batch2.js',
  'src/data/trains-batch3.js',
  'src/data/trains-extended-batch.js'
];

let updatedCount = 0;
// Carto projection calibration matrix (Delta shift to fix leftward drift)
const LNG_SHIFT = 0.0042; // Shift East to correct leftward drift
const LAT_SHIFT = 0.0000;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split(/\r?\n/);
  
  const newLines = lines.map(line => {
    const latMatch = line.match(/lat:\s*([\d\.]+)/);
    const lngMatch = line.match(/lng:\s*([\d\.]+)/);
    
    if (latMatch && lngMatch) {
       const lat = parseFloat(latMatch[1]);
       const lng = parseFloat(lngMatch[1]);
       
       const newLat = (lat + LAT_SHIFT).toFixed(6);
       const newLng = (lng + LNG_SHIFT).toFixed(6);
       
       line = line.replace(/lat:\s*[\d\.]+/, `lat: ${newLat}`);
       line = line.replace(/lng:\s*[\d\.]+/, `lng: ${newLng}`);
       updatedCount++;
    }
    return line;
  });
  
  fs.writeFileSync(file, newLines.join('\n'), 'utf8');
});

console.log("Successfully applied Carto projection alignment matrix to " + updatedCount + " railway station coordinates.");
