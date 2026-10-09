const fs = require('fs');

const updatedMetroStations = [
  { name: "Dakshineswar", lat: 22.654549, lng: 88.358345 },
  { name: "Baranagar", lat: 22.653285, lng: 88.380372 },
  { name: "Noapara", lat: 22.642625, lng: 88.385570 },
  { name: "Dum Dum", lat: 22.619695, lng: 88.389809 },
  { name: "Belgachia", lat: 22.619578, lng: 88.371177 },
  { name: "Shyambazar", lat: 22.598288, lng: 88.363880 },
  { name: "Sovabazar Sutanuti", lat: 22.596747, lng: 88.360724 },
  { name: "Girish Park", lat: 22.587146, lng: 88.360509 },
  { name: "Mahatma Gandhi Road", lat: 22.580701, lng: 88.358806 },
  { name: "Central", lat: 22.573935, lng: 88.357347 },
  { name: "Chandni Chowk", lat: 22.565861, lng: 88.351408 },
  { name: "Esplanade", lat: 22.564947, lng: 88.349124 },
  { name: "Park Street", lat: 22.555082, lng: 88.346633 },
  { name: "Maidan", lat: 22.551356, lng: 88.345787 },
  { name: "Rabindra Sadan", lat: 22.544414, lng: 88.344646 },
  { name: "Netaji Bhavan", lat: 22.532972, lng: 88.343137 },
  { name: "Jatin Das Park", lat: 22.525821, lng: 88.341551 },
  { name: "Kalighat", lat: 22.519772, lng: 88.339394 },
  { name: "Rabindra Sarobar", lat: 22.512606, lng: 88.339496 },
  { name: "Mahanayak Uttam Kumar (Tollygunge)", lat: 22.500468, lng: 88.338084 },
  { name: "Netaji", lat: 22.487178, lng: 88.338809 },
  { name: "Masterda Surya Sen", lat: 22.475674, lng: 88.345666 },
  { name: "Gitanjali", lat: 22.469839, lng: 88.355662 },
  { name: "Kavi Subhash", lat: 22.470052, lng: 88.387973 },
  { name: "Howrah Maidan", lat: 22.582259, lng: 88.333230 },
  { name: "Howrah", lat: 22.581113, lng: 88.336145 },
  { name: "Mahakaran", lat: 22.575895, lng: 88.347190 },
  { name: "Sealdah", lat: 22.565589, lng: 88.366327 },
  { name: "Phoolbagan", lat: 22.570962, lng: 88.384878 },
  { name: "Salt Lake Stadium", lat: 22.574611, lng: 88.398658 },
  { name: "Bengal Chemical", lat: 22.578393, lng: 88.398397 },
  { name: "City Center", lat: 22.583843, lng: 88.402797 },
  { name: "Central Park", lat: 22.588004, lng: 88.410414 },
  { name: "Karunamoyee", lat: 22.586449, lng: 88.416559 },
  { name: "Salt Lake Sector V", lat: 22.582582, lng: 88.424070 },
  { name: "Dum Dum Cantonment", lat: 22.637130, lng: 88.412095 },
  { name: "Jessore Road", lat: 22.637130, lng: 88.412095 },
  { name: "VIP Bazar", lat: 22.524740, lng: 88.394088 },
  { name: "Kavi Nazrul", lat: 22.466450, lng: 88.377327 },
  { name: "Taratala", lat: 22.507874, lng: 88.316242 },
  { name: "Joka", lat: 22.453191, lng: 88.299602 },
  { name: "Thakurpukur", lat: 22.464749, lng: 88.304773 },
  { name: "Sakher Bazar", lat: 22.474844, lng: 88.307762 },
  { name: "Behala Chowrasta", lat: 22.489369, lng: 88.311024 },
  { name: "Behala Bazar", lat: 22.503277, lng: 88.315666 },
  { name: "Satyajit Ray", lat: 22.480212, lng: 88.389897 },
  { name: "Majerhat", lat: 22.513739, lng: 88.303254 },
  { name: "Shahid Khudiram", lat: 22.466617, lng: 88.379384 },
  { name: "Jyotirindra Nandi", lat: 22.491282, lng: 88.392784 },
  { name: "Kavi Sukanta", lat: 22.501501, lng: 88.395797 },
  { name: "Hemanta Mukhopadhyay", lat: 22.513486, lng: 88.396483 },
  { name: "Ritwik Ghatak", lat: 22.530003, lng: 88.393691 },
  { name: "Barun Sengupta", lat: 22.542860, lng: 88.396045 },
  { name: "Beliaghata", lat: 22.548890, lng: 88.402001 },
  { name: "Jai Hind", lat: 22.644180, lng: 88.429046 }
];

const files = [
  'src/data/metro-batch1.js',
  'src/data/metro-batch2.js',
  'src/data/metro-batch3.js'
];

let updatedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split(/\r?\n/); // handle both \r\n and \n
  
  const newLines = lines.map(line => {
    const nameMatch = line.match(/name:\s*["']([^"']+)["']/);
    
    if (nameMatch) {
       let currentName = nameMatch[1];
       let matchedStation = null;
       
       for (const station of updatedMetroStations) {
         if (currentName === station.name) {
            matchedStation = station;
            break;
         } else if (currentName === "Mahanayak Uttam Kumar" && station.name.includes("Mahanayak")) {
            matchedStation = station;
            break;
         } else if (currentName === "Jai Hind (Airport)" && station.name === "Jai Hind") {
            matchedStation = station;
            break;
         } else if (currentName === "Sakherbazar" && station.name === "Sakher Bazar") {
            matchedStation = station;
            break;
         } else if (currentName === "Shobhabazar Sutanuti" && station.name === "Sovabazar Sutanuti") {
            matchedStation = station;
            break;
         } else if (currentName === "VIP Bazaar" && station.name === "VIP Bazar") {
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

console.log("Successfully updated " + updatedCount + " metro station coordinates.");
