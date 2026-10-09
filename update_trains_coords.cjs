const fs = require('fs');

const updatedRailwayStations1_50 = [
  { name: "Kalyani Ghoshpara Railway Station", lat: 22.981465, lng: 88.440755 },
  { name: "Kalyani Silpanchal Railway Station", lat: 22.976319, lng: 88.453817 },
  { name: "Kalyani Simanta Railway Station", lat: 22.987647, lng: 88.425397 },
  { name: "Kanchrapara Railway Station", lat: 22.946042, lng: 88.451408 },
  { name: "Halisahar Railway Station", lat: 22.920882, lng: 88.434193 },
  { name: "Bandel Junction Railway Station", lat: 22.922874, lng: 88.375584 },
  { name: "Hooghly Railway Station", lat: 22.906850, lng: 88.368180 },
  { name: "Chinsurah Railway Station", lat: 22.899855, lng: 88.365916 },
  { name: "Chandannagar Railway Station", lat: 22.875554, lng: 88.347433 },
  { name: "Naihati Junction Railway Station", lat: 22.886424, lng: 88.418126 },
  { name: "Barrackpore Railway Station", lat: 22.760616, lng: 88.367921 },
  { name: "Titagarh Railway Station", lat: 22.741726, lng: 88.372007 },
  { name: "Khardaha Railway Station", lat: 22.724918, lng: 88.374934 },
  { name: "Sodpur Railway Station", lat: 22.699263, lng: 88.382379 },
  { name: "Agarpara Railway Station", lat: 22.683691, lng: 88.382675 },
  { name: "Belgharia Railway Station", lat: 22.661907, lng: 88.386710 },
  { name: "Baranagar Road Railway Station", lat: 22.671972, lng: 88.360820 },
  { name: "Dakshineswar Railway Station", lat: 22.653845, lng: 88.360784 },
  { name: "Dum Dum Junction Railway Station", lat: 22.620544, lng: 88.390135 },
  { name: "Sealdah Railway Station", lat: 22.567797, lng: 88.368445 },
  { name: "Bidhannagar Road Railway Station", lat: 22.591451, lng: 88.390814 },
  { name: "Park Circus Railway Station", lat: 22.535319, lng: 88.369339 },
  { name: "Howrah Junction Railway Station", lat: 22.583483, lng: 88.335199 },
  { name: "Tikiapara Railway Station", lat: 22.595560, lng: 88.323417 },
  { name: "Dasnagar Railway Station", lat: 22.598460, lng: 88.309255 },
  { name: "Santragachi Junction Railway Station", lat: 22.576600, lng: 88.262434 },
  { name: "Ballygunge Junction Railway Station", lat: 22.522311, lng: 88.367505 },
  { name: "Dhakuria Railway Station", lat: 22.511299, lng: 88.369142 },
  { name: "Jadavpur Railway Station", lat: 22.479751, lng: 88.369781 },
  { name: "Baghajatin Railway Station", lat: 22.478629, lng: 88.372268 },
  { name: "New Garia Railway Station", lat: 22.473332, lng: 88.393238 },
  { name: "Sonarpur Junction Railway Station", lat: 22.442985, lng: 88.427969 },
  { name: "Majerhat Railway Station", lat: 22.518670, lng: 88.319740 },
  { name: "New Alipore Railway Station", lat: 22.516939, lng: 88.319071 },
  { name: "Santoshpur (South) Railway Station", lat: 22.525696, lng: 88.261699 },
  { name: "Akra Railway Station", lat: 22.524504, lng: 88.236793 },
  { name: "Budge Budge Railway Station", lat: 22.494652, lng: 88.192305 },
  { name: "Kalyani Railway Station", lat: 22.969214, lng: 88.467221 },
  { name: "Tala Railway Station", lat: 22.606387, lng: 88.376297 },
  { name: "Kolkata Station", lat: 22.600636, lng: 88.384092 },
  { name: "Bagbazar Railway Station", lat: 22.605190, lng: 88.362710 },
  { name: "Patipukur / ultadanga Railway Station", lat: 22.602133, lng: 88.387511 },
  { name: "Subhasgram Railway Station", lat: 22.414019, lng: 88.431677 },
  { name: "Narendrapur Halt Railway Station", lat: 22.454122, lng: 88.415777 },
  { name: "Garia Railway Station", lat: 22.471024, lng: 88.394020 },
  { name: "Lake Gardens Railway Station", lat: 22.508085, lng: 88.353389 },
  { name: "Ramrajatala Railway Station", lat: 22.581943, lng: 88.270922 },
  { name: "Shalimar Railway Station", lat: 22.553886, lng: 88.315929 }
];

const files = [
  'src/data/trains-batch1.js',
  'src/data/trains-batch2.js',
  'src/data/trains-batch3.js',
  'src/data/trains-extended-batch.js'
];

let updatedCount = 0;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split(/\r?\n/);
  
  const newLines = lines.map(line => {
    const nameMatch = line.match(/name:\s*["']([^"']+)["']/);
    
    if (nameMatch) {
       let currentName = nameMatch[1];
       let matchedStation = null;
       
       for (const station of updatedRailwayStations1_50) {
         if (currentName === station.name) {
            matchedStation = station;
            break;
         } else if (currentName.includes("Bagbazar") && station.name.includes("Bagbazar")) {
            matchedStation = station;
            break;
         } else if (currentName.includes("Patipukur") && station.name.includes("Patipukur")) {
            matchedStation = station;
            break;
         } else if (currentName.includes("Kolkata Station (Chitpur)") && station.name === "Kolkata Station") {
            matchedStation = station;
            break;
         }
       }
       
       if (matchedStation) {
          line = line.replace(/lat:\s*[\d\.]+/, "lat: " + matchedStation.lat);
          line = line.replace(/lng:\s*[\d\.]+/, "lng: " + matchedStation.lng);
          updatedCount++;
       }
    }
    return line;
  });
  
  fs.writeFileSync(file, newLines.join('\n'), 'utf8');
});

console.log("Successfully updated " + updatedCount + " railway station coordinates.");
