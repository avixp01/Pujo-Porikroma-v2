const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rawInput = `
31322 — Kalyani Simanta - Sealdah Local — 3:00 PM
53178 — Lalgola - Sealdah Passenger — 3:12 PM
31526 — Shantipur - Sealdah Local — 3:32 PM
31846 — Krishnanagar City - Sealdah AC Local — 3:40 PM
31324 — Kalyani Simanta - Sealdah Local — 3:45 PM
63104 — Lalgola - Sealdah MEMU — 4:00 PM
31828 — Krishnanagar City - Sealdah Galloping Local — 4:15 PM
31930 — Gede - Sealdah Special Local — 10:57 AM
31820 — Krishnanagar City - Sealdah Local — 11:22 AM
31918 — Gede - Sealdah Local — 11:27 AM
31320 — Kalyani Simanta - Sealdah Local — 11:35 AM
31622 — Ranaghat - Sealdah Local — 12:00 PM
31822 — Krishnanagar City - Sealdah Local — 12:10 PM
31522 — Shantipur - Sealdah Local — 12:22 PM
31616 — Ranaghat - Sealdah Local — 9:07 AM
63112 — Ranaghat - Sealdah MEMU — 9:12 AM
31818 — Krishnanagar City - Sealdah Galloping Local — 9:22 AM
31602 — Ranaghat - Sealdah Matribhoomi Ladies Local — 9:28 AM
31518 — Shantipur - Sealdah Galloping Local — 9:40 AM
31916 — Gede - Sealdah Galloping Local — 9:52 AM
63108 — Lalgola - Sealdah MEMU — 10:05 AM
31814 — Krishnanagar City - Sealdah Galloping Local — 7:12 AM
31314 — Kalyani Simanta - Sealdah Local — 7:30 AM
31614 — Ranaghat - Sealdah Local — 7:37 AM
31914 — Gede - Sealdah Local — 7:50 AM
31516 — Shantipur - Sealdah Local — 8:13 AM
31816 — Krishnanagar City - Sealdah Local — 8:27 AM
31316 — Kalyani Simanta - Sealdah Local — 8:40 AM
63108 — Lalgola - Sealdah MEMU — 10:05 AM
31638 — Ranaghat - Sealdah Galloping AC Local — 10:10 AM
31620 — Ranaghat - Sealdah Galloping Local — 10:18 AM
31318 — Kalyani Simanta - Sealdah Local — 10:46 AM
31520 — Shantipur - Sealdah Local — 10:52 AM
31802 — Krishnanagar City - Sealdah Matribhoomi Ladies Local — 11:00 AM
31930 — Gede - Sealdah Special Local — 10:57 AM
53172 — Lalgola - Sealdah Passenger — 4:30 AM
31512 — Shantipur - Sealdah Local — 5:40 AM
31612 — Ranaghat - Sealdah Local — 6:05 AM
31912 — Gede - Sealdah Local — 6:25 AM
31312 — Kalyani Simanta - Sealdah Local — 6:30 AM
31812 — Krishnanagar City - Sealdah Local — 6:46 AM
31514 — Shantipur - Sealdah Local — 7:05 AM
31332 — Kalyani Simanta - Sealdah Local — 8:35 PM
31534 — Shantipur - Sealdah Galloping Local — 8:45 PM
31834 — Krishnanagar City - Sealdah Local — 8:58 PM
31632 — Ranaghat - Sealdah Local — 9:15 PM
31334 — Kalyani Simanta-Sealdah Local — 9:32 PM
31836 — Krishnanagar City - Sealdah Local — 9:43 PM
31832 — Krishnanagar City - Sealdah Galloping Local — 6:40 PM
31330 — Kalyani Simanta - Sealdah Local — 7:05 PM
31628 — Ranaghat - Sealdah Galloping Local — 7:10 PM
31532 — Shantipur - Sealdah Local — 7:25 PM
53180 — Lalgola - Sealdah Passenger — 8:10 PM
31630 — Ranaghat - Sealdah Local — 8:30 PM
31522 — Shantipur - Sealdah Local — 12:22 PM
63176 — Lalgola - Sealdah MEMU — 12:45 PM
31920 — Gede - Sealdah Local — 1:18 PM
31524 — Shantipur - Sealdah Local — 1:42 PM
31342 — Kalyani - Sealdah Local — 2:10 PM
31824 — Krishnanagar City - Sealdah Local — 2:30 PM
31624 — Ranaghat - Sealdah Local — 2:41 PM
31528 — Shantipur - Sealdah Local — 4:40 PM
31922 — Gede - Sealdah Local — 5:00 PM
31830 — Krishnanagar City - Sealdah Local — 5:37 PM
31328 — Kalyani Simanta - Sealdah Local — 6:00 PM
31530 — Shantipur - Sealdah Local — 6:05 PM
31924 — Gede - Sealdah Local — 6:12 PM
31344 — Kalyani - Sealdah AC Local — 6:20 PM
31538 — Shantipur - Sealdah Local — 11:15 PM
31636 — Ranaghat - Sealdah Local — 11:25 PM
63106 — Lalgola - Sealdah MEMU — 11:25 PM
31338 — Kalyani Simanta - Sealdah Local — 11:42 PM
31540 — Shantipur - Sealdah Local — 11:50 PM
31928 — Gede - Sealdah Galloping Local — 12:02 AM
31844 — Krishnanagar City - Sealdah Local — 12:40 AM
31634 — Ranaghat - Sealdah Local — 9:55 PM
31536 — Shantipur - Sealdah Local — 10:05 PM
31340 — Kalyani - Sealdah Local — 10:19 PM
31838 — Krishnanagar City - Sealdah Local — 10:25 PM
31926 — Gede - Sealdah Local — 10:35 PM
31336 — Kalyani Simanta - Sealdah Local — 10:45 PM
31840 — Krishnanagar City - Sealdah Galloping Local — 10:55 PM
63106 — Lalgola - Sealdah MEMU — 11:25 PM
31338 — Kalyani Simanta - Sealdah Local — 11:42 PM
31540 — Shantipur - Sealdah Local — 11:50 PM
31928 — Gede - Sealdah Galloping Local — 12:02 AM
31844 — Krishnanagar City - Sealdah Local — 12:40 AM
31542 — Shantipur - Sealdah Local — 12:58 AM
`;

const lines = rawInput.trim().split('\n');

const sealdahPath = path.join(__dirname, 'public', 'train time table', 'Sealdah_Railway_Station.json');
let sealdahData = { up: [], down: [] };

try {
  sealdahData = JSON.parse(fs.readFileSync(sealdahPath, 'utf8'));
} catch (e) {
  console.log("Error reading Sealdah JSON, starting fresh.");
}

if (!sealdahData.down) sealdahData.down = [];

// Parse and add new trains
let addedCount = 0;
let skippedCount = 0;

for (const line of lines) {
  const parts = line.split('—').map(s => s.trim());
  if (parts.length >= 3) {
    const number = parts[0];
    const name = parts[1];
    const time = parts.slice(2).join(' ').trim(); // in case there's another dash
    
    // Check if train with this number already exists in down array
    // Wait, some trains run multiple times a day (like MEMUs), 
    // it's safer to check if BOTH number and time match.
    // The user said: "if already present, no need to write again."
    const exists = sealdahData.down.find(t => t.number === number && t.time === time);
    
    if (!exists) {
      sealdahData.down.push({
        number,
        name,
        time
      });
      addedCount++;
    } else {
      skippedCount++;
    }
  }
}

fs.writeFileSync(sealdahPath, JSON.stringify(sealdahData, null, 4), 'utf8');
console.log(`Added ${addedCount} new down trains to Sealdah. Skipped ${skippedCount} existing.`);

// Now recompile the timetables so the UI gets updated
try {
  execSync('node compile_timetables.cjs', { stdio: 'inherit' });
  console.log('Successfully recompiled all timetables.');
} catch (e) {
  console.log('Error recompiling timetables:', e.message);
}
