const fs = require('fs');

const updates = [
  { name: "Manicktala Chaltabagan Lohapatty", lat: 22.584895, lng: 88.369576 },
  { name: "Manoharpukur Youngs", lat: 22.520109, lng: 88.354288 },
  { name: "Master Da Smriti Sangha Club", lat: 22.603819, lng: 88.420001 },
  { name: "Md. Ali Park", lat: 22.577194, lng: 88.358162 },
  { name: "Milangarh Sarbojanin", lat: 22.651806, lng: 88.370077 },
  { name: "Mitali - Kankurgachi", lat: 22.580052, lng: 88.391557 },
  { name: "Mitali Sangha", lat: 22.579992, lng: 88.391638 },
  { name: "Mitra Sangha", lat: 22.500546, lng: 88.320367 },
  { name: "Motijheel Sarbojanin", lat: 22.623735, lng: 88.375624 },
  { name: "Mudiali Club", lat: 22.510199, lng: 88.343737 },
  { name: "Mukul Sangha", lat: 22.503601, lng: 88.311632 },
  { name: "Murari Pukur Bidhan Sangha", lat: 22.593657, lng: 88.382290 },
  { name: "Naba Baghbazar", lat: 22.603872, lng: 88.367356 },
  { name: "Naktala Udayan Sangha", lat: 22.474298, lng: 88.364015 },
  { name: "Nalin Sarkar Street Sarbojanin Durgotsab", lat: 22.595322, lng: 88.370844 },
  { name: "Naskarpara Pally Unnayan Samity - Haridevpur", lat: 22.478211, lng: 88.339902 },
  { name: "Naskarpur Sarbojanin", lat: 22.506877, lng: 88.312023 },
  { name: "Nawpara Dada Bhai Sangha", lat: 22.641675, lng: 88.386082 },
  { name: "Nepal Bhattacharjee Street", lat: 22.517989, lng: 88.340050 },
  { name: "Nepal Bhattacharya Street Club Durga Puja", lat: 22.517898, lng: 88.338686 },
  { name: "Netaji Colony Lowland Durgotsov", lat: 22.636260, lng: 88.376193 },
  { name: "Netaji Jatiya Sebadal", lat: 22.484738, lng: 88.354556 },
  { name: "Netaji Nagar Sarbojanin", lat: 22.479591, lng: 88.358629 },
  { name: "New Alipore Children's Park", lat: 22.507247, lng: 88.334482 },
  { name: "New Town Durga Puja Committee, BG Block", lat: 22.582279, lng: 88.456274 },
  { name: "Nimtala Sarbojanin DurgaPuja", lat: 22.591847, lng: 88.356125 },
  { name: "North Tridhara Durga Puja", lat: 22.595820, lng: 88.371987 },
  { name: "Nutan Sangha Durga Puja Committee", lat: 22.502086, lng: 88.316632 },
  { name: "Olabibitala Sarbojanin", lat: 22.575151, lng: 88.311733 },
  { name: "Padmapukur Baroyari", lat: 22.531880, lng: 88.351506 },
  { name: "Padmapukur Youth Association", lat: 22.532637, lng: 88.346464 },
  { name: "Pally Mangal Samity", lat: 22.502806, lng: 88.362046 },
  { name: "Pally Saradiya Club", lat: 22.543258, lng: 88.318934 },
  { name: "Pally Unnayan Samity", lat: 22.478206, lng: 88.342477 },
  { name: "Panchanan Tala Youth Association Club", lat: 22.666743, lng: 88.379804 },
  { name: "Park Circus", lat: 22.544612, lng: 88.345922 },
  { name: "Park Circus - Uddipani", lat: 22.542768, lng: 88.368420 },
  { name: "Paschim Putiary", lat: 22.479950, lng: 88.343204 },
  { name: "Pathuriaghata Pancher Pally", lat: 22.588612, lng: 88.355057 },
  { name: "Patuli Upnagari Durga Pandal", lat: 22.472205, lng: 88.383033 },
  { name: "Poddar Nagar Park", lat: 22.500876, lng: 88.361893 },
  { name: "Pradeep Sangha", lat: 22.603392, lng: 88.394647 },
  { name: "Pradip Sangha Ground", lat: 22.603718, lng: 88.394891 },
  { name: "Prafullakanan Paschim Adhibasi Brinda, Kestopur", lat: 22.607528, lng: 88.421603 },
  { name: "Pragati Pally Adhibasi Brinda", lat: 22.604456, lng: 88.401395 },
  { name: "Prasannamayee Ghat", lat: 22.517427, lng: 88.337340 },
  { name: "Prasanta Disha Sarbojanin", lat: 22.544569, lng: 88.346171 },
  { name: "Pratapaditya Road Tricone Park", lat: 22.513460, lng: 88.342161 },
  { name: "Purbachal Club", lat: 22.517585, lng: 88.361518 },
  { name: "Purbachal Sarbojonin", lat: 22.594997, lng: 88.387602 },
  { name: "Purbachal Shakti Sangha", lat: 22.504973, lng: 88.385806 },
  { name: "Raja Subodh Mallick Square Park", lat: 22.563584, lng: 88.359507 },
  { name: "Rajdanga Naba Uday Sangha", lat: 22.516632, lng: 88.387654 },
  { name: "Rajdanga Tribarna Sangha", lat: 22.516400, lng: 88.388323 },
  { name: "Ram Mohan Smriti Sangha", lat: 22.584116, lng: 88.369669 },
  { name: "RAMDULAL NIBAS er Durga Pujo", lat: 22.590332, lng: 88.364485 },
  { name: "Rammohan Sammilani", lat: 22.581647, lng: 88.375146 },
  { name: "Rani Rashmoni er Durga Pujo", lat: 22.539125, lng: 88.355929 },
  { name: "Roychoudhury Barir Durga Pujo", lat: 22.430513, lng: 88.242886 },
  { name: "Roynagar Unnayan Samity", lat: 22.470705, lng: 88.356039 },
  { name: "Rupchand Mukherjee Lane Durga Puja", lat: 22.527312, lng: 88.342376 },
  { name: "Rupchand Mukherjee Lane Sarbojanin", lat: 22.527322, lng: 88.342376 },
  { name: "Sabeda Bagan", lat: 22.527464, lng: 88.262550 },
  { name: "Sahid Colony", lat: 22.695929, lng: 88.372548 },
  { name: "Sahid Nagar", lat: 22.503359, lng: 88.369535 },
  { name: "Salt Lake AD Block", lat: 22.597841, lng: 88.405848 },
  { name: "Salt Lake AE Block - Part 1", lat: 22.597861, lng: 88.405848 },
  { name: "Salt Lake AE Block - Part 2", lat: 22.597861, lng: 88.405848 },
  { name: "Salt Lake AG Block", lat: 22.597451, lng: 88.422970 },
  { name: "Salt Lake AH Block", lat: 22.595662, lng: 88.426603 },
  { name: "Salt Lake AJ Block", lat: 22.592135, lng: 88.425774 },
  { name: "Salt Lake BE Block - Part 2", lat: 22.596932, lng: 88.407453 },
  { name: "Salt Lake BG Block", lat: 22.586474, lng: 88.409119 },
  { name: "Salt Lake BJ Block", lat: 22.590694, lng: 88.423993 },
  { name: "Salt Lake CA Block", lat: 22.586644, lng: 88.395468 },
  { name: "Salt Lake CJ Block", lat: 22.589547, lng: 88.424371 },
  { name: "Salt Lake CK-CL Block", lat: 22.583986, lng: 88.424729 },
  { name: "Salt Lake DL block", lat: 22.582207, lng: 88.423269 },
  { name: "Salt Lake FD Block", lat: 22.583454, lng: 88.412270 },
  { name: "Salt Lake GD Block", lat: 22.577681, lng: 88.415939 },
  { name: "Salt Lake HA Block", lat: 22.575625, lng: 88.411421 },
  { name: "Salt Lake IA Block", lat: 22.573550, lng: 88.411894 },
  { name: "Salt Lake Laboni", lat: 22.573550, lng: 88.411894 },
  { name: "Samaj Sebi Sangha", lat: 22.515724, lng: 88.353707 },
  { name: "Sammilita Lalabagan Sarbojanin", lat: 22.584116, lng: 88.369669 },
  { name: "Sammilita Malapara", lat: 22.587855, lng: 88.352042 },
  { name: "Sandhani", lat: 22.564995, lng: 88.393922 },
  { name: "Sanghasree", lat: 22.521259, lng: 88.343290 },
  { name: "Sangrami", lat: 22.590337, lng: 88.395224 },
  { name: "Santosh Mitra Square", lat: 22.566025, lng: 88.363078 },
  { name: "Santoshpur Agragami", lat: 22.494435, lng: 88.379266 },
  { name: "Santoshpur Avenue South Durga Puja", lat: 22.491511, lng: 88.377174 },
  { name: "Santoshpur Bibekananda Sangha", lat: 22.496154, lng: 88.244980 },
  { name: "Santoshpur Lake Pally", lat: 22.491761, lng: 88.380352 },
  { name: "Santoshpur Sonar Tori Durgotsav", lat: 22.509588, lng: 88.338182 },
  { name: "Santoshpur Trikon Park", lat: 22.493161, lng: 88.375900 },
  { name: "Sarodia Sammilani", lat: 22.521796, lng: 88.365691 },
  { name: "Satadal", lat: 22.494567, lng: 88.378045 },
  { name: "Sater Palli Sarbojonin Durgotsav Committe", lat: 22.605119, lng: 88.369712 }
];

const logFile = fs.readFileSync('C:\\Users\\Saikat Som\\.gemini\\antigravity\\brain\\3f1fd9ee-1ce4-40c2-8514-a3345db11b45\\.system_generated\\tasks\\task-10318.log', 'utf8');

const missing = [];
updates.forEach(u => {
    if (!logFile.includes(`Updated ${u.name}`)) {
        missing.push(u.name);
    }
});

const filesToCheck = [
    'src/data/pujos-part1.js',
    'src/data/pujos-part2.js',
    'src/data/pujos-part3.js',
    'src/data/pujos-part4.js',
    'src/data/pujo-batch5.js'
];

missing.forEach(m => {
    let found = false;
    const parts = m.split(' ');
    const searchWord = parts[0]; 
    
    for (const file of filesToCheck) {
        if (!fs.existsSync(file)) continue;
        const content = fs.readFileSync(file, 'utf8');
        
        const lines = content.split('\n');
        for (const line of lines) {
            if (line.includes('name:') || line.includes('"name":')) {
                if (line.toLowerCase().includes(searchWord.toLowerCase())) {
                    console.log(`Found candidate for ${m}: ${line.trim()}`);
                }
            }
        }
    }
});
