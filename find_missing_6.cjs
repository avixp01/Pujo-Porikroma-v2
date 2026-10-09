const fs = require('fs');

const updates = [
  { name: "Beleghata Santi Sangha Club Durga Puja Pandel", lat: 22.561946, lng: 88.388661 },
  { name: "Behala Panchannantala Mitali Sangha", lat: 22.502669, lng: 88.312177 },
  { name: "Beleghata Pally Unnayan Samity", lat: 22.566889, lng: 88.381525 },
  { name: "Gurudas Park Durga Puja", lat: 22.570452, lng: 88.387735 },
  { name: "Kankurgachi Naboday Pallymangal Durga Puja", lat: 22.573790, lng: 88.388358 },
  { name: "North Narkeldanga Bhratri Sangha Durga Puja Ground", lat: 22.579891, lng: 88.382412 },
  { name: "Baghmari Club Durga Puja Pandel", lat: 22.584176, lng: 88.381419 },
  { name: "Beliaghata Sree Durga Club", lat: 22.567534, lng: 88.374769 },
  { name: "Kaiser Street Sarbojanin", lat: 22.570262, lng: 88.369286 },
  { name: "Lattupara Sporting Club Saraswati Puja", lat: 22.567901, lng: 88.362946 },
  { name: "Chapatala Pally Sarbojanin", lat: 22.570957, lng: 88.365418 },
  { name: "JMM Row Durga Puja", lat: 22.571183, lng: 88.367290 },
  { name: "Brindaban Matri Mandir", lat: 22.582058, lng: 88.370459 },
  { name: "Nilmani Dutta Lane Sarbojanin Durga Puja", lat: 22.572152, lng: 88.363589 },
  { name: "Adhibasibrinda - Kanai Dhar Lane", lat: 22.572342, lng: 88.362690 },
  { name: "Durga Bari-Bandyopadhyay Poribar", lat: 22.574083, lng: 88.363445 },
  { name: "Basu Mallick Family Thakurbari Durgapuja", lat: 22.573210, lng: 88.361769 },
  { name: "Pallir Yubak Brinda", lat: 22.576106, lng: 88.364418 },
  { name: "Thanthania Dutta Bari", lat: 22.580580, lng: 88.363310 },
  { name: "Hedua Park Durga Puja", lat: 22.588324, lng: 88.366505 },
  { name: "College Square Sarbojanin Durgotsab Committee", lat: 22.573999, lng: 88.362769 },
  { name: "Akal Bodhan Durgotsav Committee", lat: 22.576005, lng: 88.358526 },
  { name: "Mitra Lane Durga Puja Samity", lat: 22.581345, lng: 88.359156 },
  { name: "Chorbagan Mitra Bari", lat: 22.582412, lng: 88.359854 },
  { name: "Simla Byayam Samity", lat: 22.585142, lng: 88.361971 },
  { name: "Kali Dutta Street Durga Puja", lat: 22.595095, lng: 88.364980 },
  { name: "Adi Kombuliatola-o-Shyambazar Street Sarbojanin Durgotsab", lat: 22.595120, lng: 88.357255 },
  { name: "Shyampukur Adi Sarbojanin Durgotsab Committee", lat: 22.598156, lng: 88.368263 },
  { name: "Shyambazar Palli Sangha", lat: 22.600061, lng: 88.366811 },
  { name: "Shyam Square Sarbojanin Durgapuja", lat: 22.600071, lng: 88.366811 },
  { name: "Tal Betal Durga Puja", lat: 22.603900, lng: 88.368523 },
  { name: "Krishna Cinema Pandal", lat: 22.578483, lng: 88.354208 },
  { name: "Machua Bazar Sarbojanin Durgapuja Samity", lat: 22.581219, lng: 88.354671 },
  { name: "Kundu Bari Durga Puja", lat: 22.585469, lng: 88.359217 },
  { name: "Jorasanko Shib Krishna Das's Bari", lat: 22.585852, lng: 88.356992 },
  { name: "Mahalla Sarbojanin Durgotsab Samity", lat: 22.591671, lng: 88.358509 },
  { name: "Baghbazar Palli and Sarbojanin Durgotsab Exhibition", lat: 22.591695, lng: 88.350784 },
  { name: "Darpanarayan Sarbojanin Durga Puja", lat: 22.587142, lng: 88.354420 },
  { name: "Hara Kutir Ray-Banerjee Barir Durga Puja", lat: 22.588567, lng: 88.355011 },
  { name: "Duer Pally Durga Puja", lat: 22.588591, lng: 88.347286 },
  { name: "Dhor Bari Durga Puja", lat: 22.588630, lng: 88.347286 },
  { name: "Ahiritola Tarun Sangha", lat: 22.594818, lng: 88.354261 },
  { name: "Ahiritola Jubak Brinda Sharbojanin Durgotsab", lat: 22.594633, lng: 88.357825 },
  { name: "FORUM for Durgotsab", lat: 22.597031, lng: 88.355695 },
  { name: "Campbagan Sadharan Durgotsob Durga Puja Pandle", lat: 22.613307, lng: 88.385526 },
  { name: "Belgachia Central Sarbojonin Durgotsav", lat: 22.604699, lng: 88.382599 },
  { name: "Paikpara Sammilani Puja Prangan", lat: 22.609346, lng: 88.382250 },
  { name: "Charer Palli Sarbojonin Durgotsav", lat: 22.617075, lng: 88.385287 },
  { name: "Sarbodaya Sammilani Durgapuja", lat: 22.618963, lng: 88.386127 },
  { name: "7 Tanks Durga Puja Pandal", lat: 22.623603, lng: 88.386429 },
  { name: "Sinthee Roy Para Sarbojanin Club Durga Puja Pandal", lat: 22.627085, lng: 88.387184 },
  { name: "CAMP Raj Rajeshwari Durga Deul", lat: 22.625581, lng: 88.395312 },
  { name: "Kadamtala Durga Mandap", lat: 22.624585, lng: 88.394336 },
  { name: "Jubak Bindra Club", lat: 22.628149, lng: 88.397939 },
  { name: "Jawpur Young Association Durga Puja Pandel", lat: 22.617235, lng: 88.398472 },
  { name: "Patipukur Adi Sarbojonin Durga Puja Committee", lat: 22.608723, lng: 88.394087 },
  { name: "Pratirodh Bahini Puja Mandal", lat: 22.607098, lng: 88.406688 },
  { name: "C Block Durga Puja Mandop", lat: 22.603747, lng: 88.407730 },
  { name: "Lake Town Park Sarbojonin Durgapuja", lat: 22.602854, lng: 88.401303 },
  { name: "Lake Town Adhibasi Brinda", lat: 22.604430, lng: 88.401299 },
  { name: "Railpukur United Club", lat: 22.612478, lng: 88.424827 },
  { name: "Bhagabati Park Durga Puja", lat: 22.617615, lng: 88.410202 },
  { name: "Khudiram Colony Durgapuja", lat: 22.618062, lng: 88.409101 },
  { name: "Nagerbazar Saha Bari Durga Puja", lat: 22.616689, lng: 88.407749 },
  { name: "Dum Dum Motijheel Durga Puja", lat: 22.623738, lng: 88.410644 },
  { name: "Shree Shree Durga Mandir", lat: 22.624149, lng: 88.405110 },
  { name: "Nagerbazar Jessore Road Adhibasi Brinda", lat: 22.623471, lng: 88.413149 },
  { name: "Nagerbazar Sarbojonin", lat: 22.623481, lng: 88.413149 },
  { name: "Maitreyi Durga Puja Mandap", lat: 22.639719, lng: 88.416477 },
  { name: "Dashadrone Youth Karna Shyam Durga Puja Pandal", lat: 22.631403, lng: 88.443918 },
  { name: "Ramkrishna Park Durga Puja Mandap", lat: 22.696176, lng: 88.397315 },
  { name: "Pansila Thakurbari", lat: 22.716195, lng: 88.386532 },
  { name: "Sahid Colony Sarbojanin Durga Pujo", lat: 22.695036, lng: 88.373876 },
  { name: "Naboday Sangha", lat: 22.703884, lng: 88.375072 },
  { name: "Udayan Sangha Club", lat: 22.697079, lng: 88.395400 },
  { name: "Sodepur Dakshin Pally Sarbojonin Durga Puja", lat: 22.698640, lng: 88.383715 },
  { name: "Dewanpara sarbojanin Durgapuja Samity", lat: 22.663627, lng: 88.379441 },
  { name: "Bijoypur Sarbojanin Durga Puja Committee", lat: 22.694383, lng: 88.389022 },
  { name: "Sodepur Deep Prangan", lat: 22.701956, lng: 88.377551 },
  { name: "Seth Colony Durga Mandir", lat: 22.696645, lng: 88.375941 },
  { name: "Jamtala Sarbojonin Durga Puja", lat: 22.979090, lng: 88.439230 },
  { name: "Bagmore Triparna Puja pandle", lat: 22.952902, lng: 88.420884 },
  { name: "Pannalal Sporting Club & Durga Puja Mondop", lat: 22.948228, lng: 88.436510 },
  { name: "16 Palli Durga Mandap", lat: 22.943839, lng: 88.447091 },
  { name: "Mahajati Club", lat: 22.946449, lng: 88.439477 },
  { name: "Biswanath Smriti Sangha Puja Mondop", lat: 22.949211, lng: 88.436699 },
  { name: "Nabankur Durga Mandap", lat: 22.948520, lng: 88.435723 },
  { name: "Rathtala Playground", lat: 22.959647, lng: 88.421886 },
  { name: "A-9 durga puja", lat: 22.967912, lng: 88.459765 },
  { name: "A-2 Durga Puja", lat: 22.972862, lng: 88.460062 },
  { name: "A-8 DURGA PUJA", lat: 22.969515, lng: 88.456558 },
  { name: "Boat Park", lat: 22.977449, lng: 88.437050 },
  { name: "Central Park Durga Puja", lat: 22.976861, lng: 88.432395 }
];

const logText = fs.readFileSync('C:\\\\Users\\\\Saikat Som\\\\.gemini\\\\antigravity\\\\brain\\\\3f1fd9ee-1ce4-40c2-8514-a3345db11b45\\\\.system_generated\\\\tasks\\\\task-10404.log', 'utf8');

const missing = [];
updates.forEach(u => {
    if (!logText.includes(`Updated ${u.name} in`)) {
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
