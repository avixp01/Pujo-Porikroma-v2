const fs = require('fs');
const path = require('path');

const userMapping = {
"Kalyani_Ghoshpara_Railway_Station": "Kalyani Ghoshpara",
"Kalyani_Silpanchal_Railway_Station": "Kalyani Silpanchal",
"Kalyani_Simanta_Railway_Station": "Kalyani Simanta",
"Kanchrapara_Railway_Station": "Kanchrapara",
"Halisahar_Railway_Station": "Halisahar",
"Bandel_Junction_Railway_Station": "Bandel Junction",
"Hooghly_Railway_Station": "Hooghly",
"Chinsurah_Railway_Station": "Chinsurah",
"Chandannagar_Railway_Station": "Chandannagar",
"Naihati_Junction_Railway_Station": "Naihati Junction",
"Barrackpore_Railway_Station": "Barrackpore",
"Titagarh_Railway_Station": "Titagarh",
"Khardaha_Railway_Station": "Khardaha",
"Sodpur_Railway_Station": "Sodpur",
"Agarpara_Railway_Station": "Agarpara",
"Belgharia_Railway_Station": "Belgharia",
"Baranagar_Road_Railway_Station": "Baranagar Road",
"Dakshineswar_Railway_Station": "Dakshineswar",
"Dum_Dum_Junction_Railway_Station": "Dum Dum Junction",
"Sealdah_Railway_Station": "Sealdah",
"Bidhannagar_Road_Railway_Station": "Bidhannagar Road",
"Park_Circus_Railway_Station": "Park Circus",
"Howrah_Junction_Railway_Station": "Howrah Junction",
"Tikiapara_Railway_Station": "Tikiapara",
"Dasnagar_Railway_Station": "Dasnagar",
"Santragachi_Junction_Railway_Station": "Santragachi Junction",
"Ballygunge_Junction_Railway_Station": "Ballygunge Junction",
"Dhakuria_Railway_Station": "Dhakuria",
"Jadavpur_Railway_Station": "Jadavpur",
"Baghajatin_Railway_Station": "Baghajatin",
"New_Garia_Railway_Station": "New Garia",
"Sonarpur_Junction_Railway_Station": "Sonarpur Junction",
"Majerhat_Railway_Station": "Majerhat",
"New_Alipore_Railway_Station": "New Alipore",
"Santoshpur_Railway_Station": "Santoshpur",
"Akra_Railway_Station": "Akra",
"Budge_Budge_Railway_Station": "Budge Budge",
"Kalyani_Railway_Station": "Kalyani",
"Tala_Railway_Station": "Tala",
"Kolkata_Station": "Kolkata Station",
"Bagbazar_Railway_Station": "Bagbazar",
"Patipukur_ultadanga_Railway_Station": "Patipukur / ultadanga",
"Subhasgram_Railway_Station": "Subhasgram",
"Narendrapur_Halt_Railway_Station": "Narendrapur Halt",
"Garia_Railway_Station": "Garia",
"Lake_Gardens_Railway_Station": "Lake Gardens",
"Ramrajatala_Railway_Station": "Ramrajatala",
"Shalimar_Railway_Station": "Shalimar"
};

const dir = path.join(__dirname, 'public', 'train time table');
const finalData = {};

// Helper to convert time if it happens to be 12-hour format
function formatTime(timeStr) {
  if (!timeStr) return "00:00";
  const [time, modifier] = timeStr.trim().split(' ');
  if (!time || !modifier) return timeStr;
  
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier.toUpperCase() === 'PM') hours = parseInt(hours, 10) + 12;
  
  hours = hours.toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const files = fs.readdirSync(dir);

for (const file of files) {
  if (!file.endsWith('.json')) continue;
  const baseName = file.replace('.json', '');
  
  // Try to use the mapping, otherwise default to stripping underscores
  const cleanName = userMapping[baseName] || baseName.replace(/_/g, ' ').replace(/ Railway Station/i, '').trim();
  
  try {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const parsed = JSON.parse(raw);
    
    // We expect the JSON to have { up: [...], down: [...] } at the root, 
    // OR something like { "Station Name": { up: [...], down: [...] } }
    let upTrains = [];
    let downTrains = [];
    
    if (parsed.up || parsed.down) {
      upTrains = parsed.up || [];
      downTrains = parsed.down || [];
    } else {
      // Find the first key that has up/down
      for (const k in parsed) {
        if (parsed[k] && (parsed[k].up || parsed[k].down)) {
          upTrains = parsed[k].up || [];
          downTrains = parsed[k].down || [];
          break;
        }
      }
    }
    
    // format them
    const formattedUp = upTrains.map(t => ({
      trainNumber: t.number || t.trainNumber,
      trainName: t.name || t.trainName,
      time: formatTime(t.time)
    }));
    
    const formattedDown = downTrains.map(t => ({
      trainNumber: t.number || t.trainNumber,
      trainName: t.name || t.trainName,
      time: formatTime(t.time)
    }));
    
    // sort them just in case
    formattedUp.sort((a, b) => a.time.localeCompare(b.time));
    formattedDown.sort((a, b) => a.time.localeCompare(b.time));
    
    finalData[cleanName] = { up: formattedUp, down: formattedDown };
    
  } catch(e) {
    console.log("Error reading file:", file, e.message);
  }
}

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'trainTimetable.json'), JSON.stringify(finalData, null, 2), 'utf8');
console.log('Successfully compiled 48 JSON files into trainTimetable.json');
