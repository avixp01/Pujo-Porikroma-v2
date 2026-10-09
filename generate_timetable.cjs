const fs = require('fs');

const stations = [
  "Sealdah", "Bidhannagar Road", "Dum Dum Junction", "Belgharia", "Agarpara", "Sodepur", "Khardaha", "Titagarh", "Barrackpore",
  "Palta", "Ichhapur", "Shyamnagar", "Jagaddal", "Kankinara", "Naihati Junction", "Halishahar", "Kanchrapara", "Kalyani",
  "Simurali", "Palpara", "Chakdaha", "Payradanga", "Ranaghat Junction", "Kalyani Ghoshpara", "Kalyani Silpanchal", "Kalyani Simanta",
  "Park Circus", "Ballygunge Junction", "Dhakuria", "Jadavpur", "Baghajatin", "New Garia", "Garia", "Sonarpur Junction",
  "Baruipur Junction", "Subhas Gram", "Mallikpur", "Kalyanpur", "Dakshin Durgapur", "Hotar", "Magra Hat", "Deula", "Netra",
  "Basuldanga", "Diamond Harbour", "Majerhat", "Brace Bridge", "Santoshpur", "Akra", "Nangi", "Budge Budge",
  "Tala", "Bagbazar", "Burrabazar", "BBD Bag", "Eden Gardens", "Prinsep Ghat", "Khidirpur",
  "Barasat", "Madhyamgram", "Birati", "Dum Dum Cantonment"
];

const upDestinations = ["Naihati Local", "Ranaghat Local", "Kalyani Simanta Local", "Barasat Local", "Budge Budge Local"];
const downDestinations = ["Sealdah Local", "Majerhat Local", "Ballygunge Local"];

const timetable = {};

stations.forEach(station => {
  timetable[station] = {
    up: [],
    down: []
  };

  // Generate trains for every 10-15 minutes for 24 hours
  let currentUpTime = new Date();
  currentUpTime.setHours(0, 0, 0, 0); // Start at midnight
  
  let currentDownTime = new Date();
  currentDownTime.setHours(0, 5, 0, 0); // Start at 00:05

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  while (currentUpTime < endOfDay) {
    const dest = upDestinations[Math.floor(Math.random() * upDestinations.length)];
    const num = "31" + Math.floor(100 + Math.random() * 900);
    timetable[station].up.push({
      trainNumber: num,
      trainName: dest,
      time: currentUpTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    });
    // Add 8 to 15 minutes
    currentUpTime.setMinutes(currentUpTime.getMinutes() + Math.floor(Math.random() * 8) + 8);
  }

  while (currentDownTime < endOfDay) {
    const dest = downDestinations[Math.floor(Math.random() * downDestinations.length)];
    const num = "34" + Math.floor(100 + Math.random() * 900);
    timetable[station].down.push({
      trainNumber: num,
      trainName: dest,
      time: currentDownTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    });
    // Add 8 to 15 minutes
    currentDownTime.setMinutes(currentDownTime.getMinutes() + Math.floor(Math.random() * 8) + 8);
  }
});

fs.writeFileSync('src/data/trainTimetable.json', JSON.stringify(timetable, null, 2), 'utf8');
console.log('Timetable JSON generated.');
