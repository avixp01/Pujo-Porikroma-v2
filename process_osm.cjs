const fs = require('fs');

let code = fs.readFileSync('src/data/allPujos.js', 'utf8');
const cjsCode = code.replace('export const allPujos =', 'module.exports =');
fs.writeFileSync('temp_allPujos.js', cjsCode, 'utf8');
const allPujos = require('./temp_allPujos.js');
fs.unlinkSync('temp_allPujos.js');

const rawData = fs.readFileSync('toilets.json', 'utf8');
const data = JSON.parse(rawData);
const toilets = data.elements;

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

const validToilets = [];
const seen = new Set();
let count = 0;

for (const t of toilets) {
    let isNearPandal = false;
    for (const p of allPujos) {
        if (getDistance(t.lat, t.lon, p.lat, p.lng) <= 0.5) {
            isNearPandal = true;
            break;
        }
    }
    
    if (isNearPandal) {
        count++;
        const name = (t.tags && t.tags.name) ? t.tags.name : ((t.tags && t.tags['name:en']) ? t.tags['name:en'] : 'Public Toilet');
        const key = t.lat + ',' + t.lon;
        if (!seen.has(key)) {
            seen.add(key);
            validToilets.push({
                name: name,
                category: 'Toilets',
                lat: t.lat,
                lng: t.lon
            });
        }
    }
}

console.log('Filtered down to ' + validToilets.length + ' toilets within 500m of pandals.');

const fileContent = '// osmToilets.js - Auto-fetched OSM Toilets near Pandals\nexport const osmToilets = ' + JSON.stringify(validToilets, null, 2) + ';\n';
fs.writeFileSync('src/data/osmToilets.js', fileContent, 'utf8');
console.log('Successfully written to src/data/osmToilets.js');
