const fs = require('fs');

const updates = [
  { name: "Dakshinpara durgotsab committee", lat: 22.613363, lng: 88.418785 },
  { name: "Darjipara sarbojanin Durgotsab", lat: 22.592541, lng: 88.365428 },
  { name: "Darpanarayan Tagore Street Pally Samity", lat: 22.587260, lng: 88.354465 },
  { name: "DB Block", lat: 22.586631, lng: 88.402438 },
  { name: "Debdaru Fatak", lat: 22.502592, lng: 88.314971 },
  { name: "Dewanpara Maath Durga Pujo", lat: 22.662431, lng: 88.378131 },
  { name: "Dilip Smriti Sangha", lat: 22.518019, lng: 88.342510 },
  { name: "Dum Dum Mall Palli Club", lat: 22.628117, lng: 88.419562 },
  { name: "Dum Dum Park Bharat Chakra", lat: 22.610826, lng: 88.412025 },
  { name: "Dum Dum Park Sarbojanin Durga Puja", lat: 22.609441, lng: 88.413830 },
  { name: "Dum Dum Park Tarun Sangha", lat: 22.610056, lng: 88.408913 },
  { name: "Dum Dum Park Yubak Brinda", lat: 22.605435, lng: 88.415244 },
  { name: "Dum Dum Tarun Dal", lat: 22.611491, lng: 88.416051 },
  { name: "Durga Puja of 4 Ghosh Lane", lat: 22.585224, lng: 88.370702 },
  { name: "Durgabari", lat: 22.612478, lng: 88.421557 },
  { name: "EC Market", lat: 22.585042, lng: 88.408479 },
  { name: "EE Block", lat: 22.580846, lng: 88.423386 },
  { name: "Ekdalia Evergreen Club", lat: 22.521224, lng: 88.363988 },
  { name: "Ekush Pally Sarbojonin Durgotsab", lat: 22.529175, lng: 88.368816 },
  { name: "Falguni Sangha", lat: 22.522024, lng: 88.363179 },
  { name: "FC Block", lat: 22.579931, lng: 88.414859 },
  { name: "FE Block", lat: 22.579931, lng: 88.414859 },
  { name: "Forward Club", lat: 22.522990, lng: 88.341398 },
  { name: "Ganbani Sangha", lat: 22.488768, lng: 88.327805 },
  { name: "Garia Mitali Sangha", lat: 22.462024, lng: 88.380146 },
  { name: "Garia Pancha Durga", lat: 22.565911, lng: 88.389085 },
  { name: "Garia Sabuj Dal", lat: 22.469617, lng: 88.381934 },
  { name: "Garia Sreerampur Kalyan Samity", lat: 22.467286, lng: 88.378087 },
  { name: "Gauri Bari Sarbojanin Durga Puja", lat: 22.594453, lng: 88.376511 },
  { name: "GC Block", lat: 22.579680, lng: 88.413670 },
  { name: "Ghas Bagan", lat: 22.592135, lng: 88.340959 },
  { name: "Goabagan Sarbojanin", lat: 22.589356, lng: 88.371700 },
  { name: "Goal Math", lat: 22.527373, lng: 88.346594 },
  { name: "Golaghata Sammilani Club", lat: 22.597344, lng: 88.396571 },
  { name: "Golden Arrow Club", lat: 22.516486, lng: 88.345102 },
  { name: "Golfgreen Phase 1", lat: 22.492113, lng: 88.360960 },
  { name: "Golfgreen Phase 2", lat: 22.494866, lng: 88.363088 },
  { name: "Gouriberia", lat: 22.594550, lng: 88.376634 },
  { name: "Gourimata Udyan", lat: 22.601234, lng: 88.364301 },
  { name: "Green Avenue Sarbojanin", lat: 22.556174, lng: 88.390288 },
  { name: "Greenpark Recreation Club", lat: 22.444701, lng: 88.397091 },
  { name: "Greenwood Nook", lat: 22.505460, lng: 88.397776 },
  { name: "HA Block", lat: 22.505603, lng: 88.317950 },
  { name: "Halsibagan Sarbajanin", lat: 22.584756, lng: 88.366254 },
  { name: "Hari Ghosh Street", lat: 22.590426, lng: 88.368148 },
  { name: "Haridevpur 41 Pally Club", lat: 22.482789, lng: 88.336140 },
  { name: "Haridevpur Adarsha Samiti", lat: 22.475913, lng: 88.332213 },
  { name: "Haridevpur New Sporting Club", lat: 22.480073, lng: 88.333213 },
  { name: "Harish Park Puja", lat: 22.530281, lng: 88.343590 },
  { name: "Haritaki Bagan", lat: 22.586452, lng: 88.372191 },
  { name: "Hathkhola Dutta Barir Durga Pujo", lat: 22.592851, lng: 88.352357 },
  { name: "Hatibagan Nabin Pally", lat: 22.595908, lng: 88.370843 },
  { name: "Hatibagan Sarbojanin", lat: 22.594391, lng: 88.369425 },
  { name: "Hatkhola Gosain Para", lat: 22.599100, lng: 88.356729 },
  { name: "Hazra Park Durga Puja", lat: 22.524439, lng: 88.343479 },
  { name: "HB Block", lat: 22.576254, lng: 88.414121 },
  { name: "Hindustan Club", lat: 22.533726, lng: 88.342121 },
  { name: "Hindustan Park", lat: 22.517684, lng: 88.359497 },
  { name: "IB Block", lat: 22.571908, lng: 88.414117 },
  { name: "ITI More Durga Puja Ground", lat: 22.979617, lng: 88.435972 },
  { name: "Jadavpur Athletic Club", lat: 22.488921, lng: 88.369056 },
  { name: "Jagat Mukherjee Park", lat: 22.599495, lng: 88.363464 },
  { name: "JAGORANI SANGHA DURGA PUJA", lat: 22.592992, lng: 88.382322 },
  { name: "Jatra Suru Sangha", lat: 22.470705, lng: 88.375265 },
  { name: "Jawpur Bayam Samiti", lat: 22.613596, lng: 88.402052 },
  { name: "JC Block", lat: 22.568909, lng: 88.408401 },
  { name: "Jitendra Smriti Sangha", lat: 22.506138, lng: 88.321334 },
  { name: "Jodhpur Park", lat: 22.506366, lng: 88.352466 },
  { name: "Jogajatri Club", lat: 22.475169, lng: 88.320060 },
  { name: "Joramandir", lat: 22.613211, lng: 88.429876 },
  { name: "Jorasanko 7 Palli Sarbojonin", lat: 22.583994, lng: 88.358756 },
  { name: "Jorasanko Sadharan Durgotsav", lat: 22.586244, lng: 88.357982 },
  { name: "Judge Bagan Recreation Club", lat: 22.477405, lng: 88.336426 },
  { name: "Kabiraj Bagan", lat: 22.592957, lng: 88.382601 },
  { name: "Kabitirtha", lat: 22.543776, lng: 88.321612 },
  { name: "Kalighat Milan Sangha", lat: 22.524322, lng: 88.338465 },
  { name: "kalighat Yuba Maitry", lat: 22.522393, lng: 88.341408 },
  { name: "Kamardanga Sitalatala - Howrah", lat: 22.595968, lng: 88.301731 },
  { name: "Kanai Dhar Ln", lat: 22.572256, lng: 88.362803 },
  { name: "Karbagan Sarbojanin", lat: 22.595241, lng: 88.384278 },
  { name: "Karunamayee G Block", lat: 22.582479, lng: 88.420640 },
  { name: "Kashi Bose Lane", lat: 22.590881, lng: 88.368912 },
  { name: "Kendua Shanti Sangha - Patuli", lat: 22.471989, lng: 88.378926 },
  { name: "Khelat Ghose er Durga Pujo", lat: 22.588836, lng: 88.356599 },
  { name: "Khidderpore Pally Saradiya", lat: 22.543258, lng: 88.318929 },
  { name: "Krishna Cinema Pandal", lat: 22.578483, lng: 88.354208 },
  { name: "Kumartuli Park", lat: 22.598988, lng: 88.358891 },
  { name: "Kumartuli Preparation", lat: 22.600002, lng: 88.361268 },
  { name: "Kumartuli Sarbojonin", lat: 22.598452, lng: 88.358439 },
  { name: "Lake Pally Sarbojanin", lat: 22.514970, lng: 88.347942 },
  { name: "Lake Terrace Friend's Club", lat: 22.516286, lng: 88.354634 },
  { name: "Lake Youth Corner", lat: 22.510682, lng: 88.344674 },
  { name: "Laketown Adhibasi Brinda", lat: 22.604456, lng: 88.401395 },
  { name: "Laketown Netaji Sporting Club", lat: 22.608332, lng: 88.397822 },
  { name: "Laketown Nutan Palli", lat: 22.603066, lng: 88.394402 },
  { name: "Lalabagan Sarbojanin Puja Ground", lat: 22.587362, lng: 88.376875 },
  { name: "Lalabagan Yubak Brinda - Nabankur", lat: 22.603293, lng: 88.355777 },
  { name: "Maddox Square", lat: 22.526568, lng: 88.352073 },
  { name: "Maitri Sansad Club and Ground", lat: 22.482415, lng: 88.377011 },
  { name: "MANASBAG SARBOJONIN DURGOTSAV", lat: 22.666394, lng: 88.375816 }
];

const filesToCheck = [
    'src/data/pujos-part1.js',
    'src/data/pujos-part2.js',
    'src/data/pujos-part3.js',
    'src/data/pujos-part4.js',
    'src/data/pujo-batch5.js'
];

let updatedCount = 0;

for (const file of filesToCheck) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    for (const update of updates) {
        const escapedName = update.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"${escapedName}"[^}]*\\})`, 'g');
        
        let localModified = false;
        content = content.replace(nameRegex, (match) => {
            localModified = true;
            let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: ${update.lat}`);
            newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: ${update.lng}`);
            return newMatch;
        });

        if (localModified) {
            modified = true;
            updatedCount++;
            console.log(`Updated ${update.name} in ${file}`);
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
    }
}
console.log(`Batch 125-225 updates complete! Updated ${updatedCount} pandals.`);
