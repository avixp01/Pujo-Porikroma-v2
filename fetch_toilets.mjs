import fs from 'fs';
import { allPujos } from './src/data/allPujos.js';
import https from 'https';

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

const query = `[out:json][timeout:25];(node["amenity"="toilets"](22.40,88.20,22.75,88.55););out body;`;
const postData = 'data=' + encodeURIComponent(query);

const options = {
  hostname: 'overpass-api.de',
  path: '/api/interpreter',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData),
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 PujoPorikromaScript'
  }
};

const req = https.request(options, (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const data = JSON.parse(rawData);
      const toilets = data.elements;
      console.log(`Found ${toilets.length} toilets in Kolkata bounding box.`);
      
      const validToilets = [];
      const seen = new Set();
      
      for (const t of toilets) {
          let isNearPandal = false;
          for (const p of allPujos) {
              if (getDistance(t.lat, t.lon, p.lat, p.lng) <= 0.5) {
                  isNearPandal = true;
                  break;
              }
          }
          
          if (isNearPandal) {
              const name = t.tags.name || t.tags['name:en'] || "Public Toilet";
              const key = `${t.lat},${t.lon}`;
              if (!seen.has(key)) {
                  seen.add(key);
                  validToilets.push({
                      name: name,
                      category: "Toilets",
                      lat: t.lat,
                      lng: t.lon
                  });
              }
          }
      }
      
      console.log(`Filtered down to ${validToilets.length} toilets within 500m of pandals.`);
      
      const fileContent = `// toilets-batch-osm.js - Auto-fetched OSM Toilets near Pandals\nexport const toiletsBatchOsm = ${JSON.stringify(validToilets, null, 2)};\n`;
      fs.writeFileSync('./src/data/toilets-batch-osm.js', fileContent, 'utf8');
      console.log('Successfully written to src/data/toilets-batch-osm.js');
      
    } catch (e) {
      console.error(e.message);
    }
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();
