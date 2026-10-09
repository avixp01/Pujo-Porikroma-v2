const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sealdahPath = path.join(__dirname, 'public', 'train time table', 'Sealdah_Railway_Station.json');
let sealdahData = JSON.parse(fs.readFileSync(sealdahPath, 'utf8'));

// The original trains were inside a key like "Sealdah Railway Station"
let mainKey = Object.keys(sealdahData).find(k => k !== 'down' && k !== 'up' && sealdahData[k].up);
if (!mainKey) mainKey = "Sealdah Railway Station"; // fallback

if (!sealdahData[mainKey]) {
    sealdahData[mainKey] = { up: [], down: [] };
}

// Move root down trains into the main object
if (sealdahData.down && Array.isArray(sealdahData.down)) {
    for (const newTrain of sealdahData.down) {
        // check for duplicates again
        const exists = sealdahData[mainKey].down.find(t => t.number === newTrain.number && t.time === newTrain.time);
        if (!exists) {
            sealdahData[mainKey].down.push(newTrain);
        }
    }
}

// Delete root arrays so compile_timetables.cjs correctly picks up the nested ones
delete sealdahData.up;
delete sealdahData.down;

fs.writeFileSync(sealdahPath, JSON.stringify(sealdahData, null, 4), 'utf8');
console.log('Fixed Sealdah JSON structure.');

execSync('node compile_timetables.cjs', { stdio: 'inherit' });
console.log('Recompiled successfully!');
