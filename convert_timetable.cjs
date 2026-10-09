const fs = require('fs');

try {
  const rawData = fs.readFileSync('public/all_48_stations_master_timetable.json', 'utf8');
  const userTimetable = JSON.parse(rawData);
  
  const formattedTimetable = {};

  // Helper to convert "04:00 AM" to "04:00" or "02:30 PM" to "14:30"
  function convertTime12to24(timeStr) {
    if (!timeStr) return "00:00";
    const [time, modifier] = timeStr.trim().split(' ');
    if (!time || !modifier) return timeStr; // Fallback if already 24h or weird format
    
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier.toUpperCase() === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    
    // pad with zero
    hours = hours.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  for (const station in userTimetable) {
    // Strip " Railway Station" to match my cleanName logic
    const cleanStation = station.replace(/ Railway Station/i, '').trim();
    
    formattedTimetable[cleanStation] = { up: [], down: [] };
    
    const upTrains = userTimetable[station].up || [];
    const downTrains = userTimetable[station].down || [];
    
    upTrains.forEach(t => {
      formattedTimetable[cleanStation].up.push({
        trainNumber: t.number || t.trainNumber,
        trainName: t.name || t.trainName,
        time: convertTime12to24(t.time)
      });
    });
    
    downTrains.forEach(t => {
      formattedTimetable[cleanStation].down.push({
        trainNumber: t.number || t.trainNumber,
        trainName: t.name || t.trainName,
        time: convertTime12to24(t.time)
      });
    });
    
    // Sort just in case
    formattedTimetable[cleanStation].up.sort((a, b) => a.time.localeCompare(b.time));
    formattedTimetable[cleanStation].down.sort((a, b) => a.time.localeCompare(b.time));
  }

  fs.writeFileSync('src/data/trainTimetable.json', JSON.stringify(formattedTimetable, null, 2), 'utf8');
  console.log('Successfully converted user dataset and updated src/data/trainTimetable.json!');
} catch (error) {
  console.error('Error processing timetable:', error);
}
