const fs = require('fs');

const updates = [
  { name: "Newland Durgapuja Mandap", lat: 22.505249, lng: 88.226478 },
  { name: "Rampur Pally Unanyan Pathagar", lat: 22.515174, lng: 88.238866 },
  { name: "Parnasree Green Durga Puja", lat: 22.507490, lng: 88.296948 },
  { name: "Parnasree Club Durga Puja Ground", lat: 22.506956, lng: 88.304041 },
  { name: "BegorKhal Nimtala Pallybasi Durga Puja", lat: 22.496349, lng: 88.291382 },
  { name: "Durga Bahini, Nabanpally Khelarmath Durga Puja Committee", lat: 22.493472, lng: 88.290292 },
  { name: "Bhartiya Yuva Parishad Puja Pandal", lat: 22.551604, lng: 88.270833 },
  { name: "Mudiali Uttrina Sangha Club", lat: 22.546515, lng: 88.280057 },
  { name: "Dewan Bagan Durga Puja", lat: 22.543307, lng: 88.282000 },
  { name: "Sarani Durga Puja", lat: 22.541671, lng: 88.281312 },
  { name: "Mallick Para Durga Puja Pandal", lat: 22.541192, lng: 88.282048 },
  { name: "Sri Sri Shardiye Durga Puja", lat: 22.540518, lng: 88.282831 },
  { name: "Nut Behari Das Sanghati Pally Durga Puja", lat: 22.537415, lng: 88.285698 },
  { name: "Fatehpur Bazar Durga Puja Pandel", lat: 22.537608, lng: 88.288586 },
  { name: "New Ekar Pally Durga Puja Pandel", lat: 22.538716, lng: 88.287485 },
  { name: "Ghosh Bari Durga Puja", lat: 22.549758, lng: 88.248480 },
  { name: "Ramnagar Durga Puja", lat: 22.543105, lng: 88.291925 },
  { name: "Begorkhal Nintala Pallybasi Durga Puja", lat: 22.496349, lng: 88.291382 },
  { name: "Parnasree Club Puja Ground", lat: 22.506154, lng: 88.303261 },
  { name: "Joyrampur Sarbojanin Durga Puja Committee", lat: 22.492147, lng: 88.307365 },
  { name: "Joyrampur Sammilita Sarbojanin Durga Puja Committee, Behala", lat: 22.490683, lng: 88.305650 },
  { name: "Sonar Durga Bari", lat: 22.499826, lng: 88.311974 },
  { name: "Behala Panchannantala Mitali Sangha", lat: 22.502674, lng: 88.312177 },
  { name: "Behala Club Sarbojanin Durgotsar Committee", lat: 22.505265, lng: 88.311506 },
  { name: "Behala Uttarsuri Durga Puja", lat: 22.491679, lng: 88.312408 },
  { name: "Nutanpara Kalyan Sangha", lat: 22.484612, lng: 88.306706 },
  { name: "Natunpara Durga Puja Pandel", lat: 22.484593, lng: 88.304134 },
  { name: "Mejo Bari", lat: 22.479724, lng: 88.303800 },
  { name: "Sabarana Roy Chowdhury Sajer Attchala Bari", lat: 22.480088, lng: 88.304024 },
  { name: "Barisha Udayan Pally", lat: 22.475460, lng: 88.306640 },
  { name: "Barisha 22 Pally Sarbojanin Durgotsab", lat: 22.475767, lng: 88.302224 },
  { name: "Thakurpukur Club Durga Puja", lat: 22.466785, lng: 88.304994 },
  { name: "Sister Nivedita Multipurpose Society Durga Puja Mandap", lat: 22.466938, lng: 88.309523 },
  { name: "Tarun Dal Durgapuja Area", lat: 22.471399, lng: 88.309075 },
  { name: "AJC Bose Road Durgapuja Area", lat: 22.473108, lng: 88.308349 },
  { name: "Basu Barir Durga Puja", lat: 22.479192, lng: 88.312845 },
  { name: "Barisha Mukul Sangha Durga Puja", lat: 22.479714, lng: 88.308278 },
  { name: "Behala Players Corner Durga Puja", lat: 22.485853, lng: 88.311142 },
  { name: "Milan Mandir", lat: 22.487264, lng: 88.311387 },
  { name: "Barisha Ekota Sangha Club House", lat: 22.487944, lng: 88.312997 },
  { name: "Jadu and Mitra Colony Durgapuja", lat: 22.492938, lng: 88.314766 },
  { name: "Behala Pragati Sangha Durga Puja", lat: 22.494983, lng: 88.314133 },
  { name: "Barisha Sabuj Sangha Club", lat: 22.471428, lng: 88.312363 },
  { name: "Souvik Chakraborty Bara Bagan Sarbojonin Durga Puja Area C3, Bidya Sagar Sarani", lat: 22.472247, lng: 88.310228 },
  { name: "Sakti Sangha Durgapuja Area", lat: 22.474380, lng: 88.313232 },
  { name: "Agraduth Club Durga Puja", lat: 22.482915, lng: 88.312337 },
  { name: "Behala East Park Samaj Bhavan", lat: 22.484704, lng: 88.323244 },
  { name: "Barisha Milan Tirtha Club", lat: 22.488313, lng: 88.318938 },
  { name: "Umapally Durga Puja", lat: 22.490440, lng: 88.320276 },
  { name: "Mahila Samity Durga Puja", lat: 22.491633, lng: 88.320462 },
  { name: "Parnasree Durgapuja Ground", lat: 22.491342, lng: 88.284384 },
  { name: "Jaipurpally Durga Puja", lat: 22.492944, lng: 88.322050 },
  { name: "65 Pally Club", lat: 22.498060, lng: 88.318541 },
  { name: "Nabarun Sangha Club", lat: 22.499036, lng: 88.323857 },
  { name: "K.F.R. Ground Sarbojanin Durgapuja", lat: 22.502233, lng: 88.319113 },
  { name: "Mitali Sangha", lat: 22.505233, lng: 88.326053 },
  { name: "Charu Avenue Nabapalli Sangha", lat: 22.507087, lng: 88.341226 },
  { name: "Prabhati Sangha Club", lat: 22.505716, lng: 88.347356 },
  { name: "Adarsha Samiti Club", lat: 22.475913, lng: 88.332213 },
  { name: "Taltala Durga Puja Pandal", lat: 22.503007, lng: 88.362109 },
  { name: "Durga Mandir - Dhakuria", lat: 22.511184, lng: 88.374171 },
  { name: "Chetla Nabarun Sangha", lat: 22.511351, lng: 88.339332 },
  { name: "Tarun Sangha Durga Puja", lat: 22.511351, lng: 88.339332 },
  { name: "Lake Ave Durga Puja", lat: 22.511046, lng: 88.345112 },
  { name: "24 Pally Club", lat: 22.513454, lng: 88.334601 },
  { name: "27 Pally Park", lat: 22.515395, lng: 88.342110 },
  { name: "Akal Bodhan Durga Mandir", lat: 22.515610, lng: 88.333843 },
  { name: "Chetla Palli Durga Puja", lat: 22.515840, lng: 88.340082 },
  { name: "Kolahal Gosthi Club", lat: 22.516744, lng: 88.330506 },
  { name: "Chetla Sarbasadharaner Durgotsab", lat: 22.517318, lng: 88.337363 },
  { name: "Sen Bari Durgapuja", lat: 22.518635, lng: 88.341764 },
  { name: "Moitri Sangha Durga Puja Pandel", lat: 22.518717, lng: 88.347516 },
  { name: "Sarat Bose Road Durga Puja Pandel", lat: 22.520695, lng: 88.349102 },
  { name: "Dover Terrace, Ballygunge", lat: 22.522873, lng: 88.348598 },
  { name: "Gariahat Hindusthan Club", lat: 22.520162, lng: 88.358335 },
  { name: "Ballygunge Pratisthan Durga Bari", lat: 22.525425, lng: 88.367080 },
  { name: "Gol Math Durga Puja Samiti", lat: 22.526876, lng: 88.346974 },
  { name: "National Library Durga Puja Community Shed", lat: 22.531086, lng: 88.332028 },
  { name: "Mallick Bari", lat: 22.533603, lng: 88.346517 },
  { name: "Dakshin Kolkata Sarbojanin Durgotsab", lat: 22.533627, lng: 88.338792 },
  { name: "Paddapukur Barowari Durga Puja", lat: 22.531821, lng: 88.351803 },
  { name: "Peyara Bagan Durga Puja", lat: 22.529273, lng: 88.351658 },
  { name: "Hide Road Durga Puja Pandal", lat: 22.535219, lng: 88.307297 },
  { name: "Shree Shree Sarbojanin Durga Puja", lat: 22.532231, lng: 88.310354 },
  { name: "Khidderpore Nabarag", lat: 22.541716, lng: 88.318680 },
  { name: "Udaya Kidderpore", lat: 22.544166, lng: 88.318845 },
  { name: "Khidderpore Sarbojanin Durgotsov", lat: 22.538947, lng: 88.322354 },
  { name: "Dahighat Durga Puja Committee", lat: 22.549207, lng: 88.323935 },
  { name: "Tangra Housing Durga Puja Ground", lat: 22.553814, lng: 88.380091 },
  { name: "Betbagan Durga Pandal", lat: 22.562130, lng: 88.380397 },
  { name: "Entally Sen Villa Durga Puja", lat: 22.560755, lng: 88.371266 },
  { name: "14 Pally Udayan Sangha", lat: 22.557591, lng: 88.364400 },
  { name: "Taltala Children's Park Sarbojanin", lat: 22.558167, lng: 88.364100 },
  { name: "Ramgopal Saha's House Durga Puja", lat: 22.564558, lng: 88.359499 },
  { name: "Mitram Athletic Club Durga Puja", lat: 22.564119, lng: 88.360774 },
  { name: "Nilmani Dey's Thakur Bari", lat: 22.566615, lng: 88.360352 },
  { name: "Madhya Kolkata Malanga Lane Bayam Samity-Akal Bodhon Puja", lat: 22.566675, lng: 88.356041 },
  { name: "47 Pally Jubakbrinda", lat: 22.571475, lng: 88.356156 },
  { name: "Metropolitan Durga Bari", lat: 22.554197, lng: 88.403783 },
  { name: "Rasmoni Bagan Durga Temple", lat: 22.560372, lng: 88.389052 }
];

const logText = `
Updated Newland Durgapuja Mandap in src/data/pujo-batch5.js
Updated Rampur Pally Unanyan Pathagar in src/data/pujo-batch5.js
Updated Parnasree Green Durga Puja in src/data/pujo-batch5.js
Updated Parnasree Club Durga Puja Ground in src/data/pujo-batch5.js
Updated BegorKhal Nimtala Pallybasi Durga Puja in src/data/pujo-batch5.js
Updated Durga Bahini, Nabanpally Khelarmath Durga Puja Committee in src/data/pujo-batch5.js
Updated Bhartiya Yuva Parishad Puja Pandal in src/data/pujo-batch5.js
Updated Mudiali Uttrina Sangha Club in src/data/pujo-batch5.js
Updated Dewan Bagan Durga Puja in src/data/pujo-batch5.js
Updated Sarani Durga Puja in src/data/pujo-batch5.js
Updated Mallick Para Durga Puja Pandal in src/data/pujo-batch5.js
Updated Sri Sri Shardiye Durga Puja in src/data/pujo-batch5.js
Updated Nut Behari Das Sanghati Pally Durga Puja in src/data/pujo-batch5.js
Updated Fatehpur Bazar Durga Puja Pandel in src/data/pujo-batch5.js
Updated New Ekar Pally Durga Puja Pandel in src/data/pujo-batch5.js
Updated Ghosh Bari Durga Puja in src/data/pujo-batch5.js
Updated Ramnagar Durga Puja in src/data/pujo-batch5.js
Updated Begorkhal Nintala Pallybasi Durga Puja in src/data/pujo-batch5.js
Updated Parnasree Club Puja Ground in src/data/pujo-batch5.js
Updated Joyrampur Sarbojanin Durga Puja Committee in src/data/pujo-batch5.js
Updated Joyrampur Sammilita Sarbojanin Durga Puja Committee, Behala in src/data/pujo-batch5.js
Updated Sonar Durga Bari in src/data/pujo-batch5.js
Updated Behala Panchannantala Mitali Sangha in src/data/pujo-batch5.js
Updated Behala Club Sarbojanin Durgotsar Committee in src/data/pujo-batch5.js
Updated Behala Uttarsuri Durga Puja in src/data/pujo-batch5.js
Updated Nutanpara Kalyan Sangha in src/data/pujo-batch5.js
Updated Natunpara Durga Puja Pandel in src/data/pujo-batch5.js
Updated Mejo Bari in src/data/pujo-batch5.js
Updated Sabarana Roy Chowdhury Sajer Attchala Bari in src/data/pujo-batch5.js
Updated Barisha Udayan Pally in src/data/pujo-batch5.js
Updated Barisha 22 Pally Sarbojanin Durgotsab in src/data/pujo-batch5.js
Updated Thakurpukur Club Durga Puja in src/data/pujo-batch5.js
Updated Sister Nivedita Multipurpose Society Durga Puja Mandap in src/data/pujo-batch5.js
Updated Tarun Dal Durgapuja Area in src/data/pujo-batch5.js
Updated AJC Bose Road Durgapuja Area in src/data/pujo-batch5.js
Updated Basu Barir Durga Puja in src/data/pujo-batch5.js
Updated Barisha Mukul Sangha Durga Puja in src/data/pujo-batch5.js
Updated Behala Players Corner Durga Puja in src/data/pujo-batch5.js
Updated Milan Mandir in src/data/pujo-batch5.js
Updated Barisha Ekota Sangha Club House in src/data/pujo-batch5.js
Updated Jadu and Mitra Colony Durgapuja in src/data/pujo-batch5.js
Updated Behala Pragati Sangha Durga Puja in src/data/pujo-batch5.js
Updated Barisha Sabuj Sangha Club in src/data/pujo-batch5.js
Updated Sakti Sangha Durgapuja Area in src/data/pujo-batch5.js
Updated Agraduth Club Durga Puja in src/data/pujo-batch5.js
Updated Behala East Park Samaj Bhavan in src/data/pujo-batch5.js
Updated Barisha Milan Tirtha Club in src/data/pujo-batch5.js
Updated Umapally Durga Puja in src/data/pujo-batch5.js
Updated Mahila Samity Durga Puja in src/data/pujo-batch5.js
Updated Parnasree Durgapuja Ground in src/data/pujo-batch5.js
Updated Jaipurpally Durga Puja in src/data/pujo-batch5.js
Updated 65 Pally Club in src/data/pujo-batch5.js
Updated Nabarun Sangha Club in src/data/pujo-batch5.js
Updated K.F.R. Ground Sarbojanin Durgapuja in src/data/pujo-batch5.js
Updated Mitali Sangha in src/data/pujo-batch5.js
Updated Charu Avenue Nabapalli Sangha in src/data/pujo-batch5.js
Updated Prabhati Sangha Club in src/data/pujo-batch5.js
Updated Adarsha Samiti Club in src/data/pujo-batch5.js
Updated Taltala Durga Puja Pandal in src/data/pujo-batch5.js
Updated Durga Mandir - Dhakuria in src/data/pujo-batch5.js
Updated Chetla Nabarun Sangha in src/data/pujo-batch5.js
Updated Tarun Sangha Durga Puja in src/data/pujo-batch5.js
Updated Lake Ave Durga Puja in src/data/pujo-batch5.js
Updated 24 Pally Club in src/data/pujo-batch5.js
Updated 27 Pally Park in src/data/pujo-batch5.js
Updated Akal Bodhan Durga Mandir in src/data/pujo-batch5.js
Updated Chetla Palli Durga Puja in src/data/pujo-batch5.js
Updated Kolahal Gosthi Club in src/data/pujo-batch5.js
Updated Chetla Sarbasadharaner Durgotsab in src/data/pujo-batch5.js
Updated Sen Bari Durgapuja in src/data/pujo-batch5.js
Updated Moitri Sangha Durga Puja Pandel in src/data/pujo-batch5.js
Updated Sarat Bose Road Durga Puja Pandel in src/data/pujo-batch5.js
Updated Dover Terrace, Ballygunge in src/data/pujo-batch5.js
Updated Gariahat Hindusthan Club in src/data/pujo-batch5.js
Updated Ballygunge Pratisthan Durga Bari in src/data/pujo-batch5.js
Updated Gol Math Durga Puja Samiti in src/data/pujo-batch5.js
Updated National Library Durga Puja Community Shed in src/data/pujo-batch5.js
Updated Mallick Bari in src/data/pujo-batch5.js
Updated Dakshin Kolkata Sarbojanin Durgotsab in src/data/pujo-batch5.js
Updated Paddapukur Barowari Durga Puja in src/data/pujo-batch5.js
Updated Peyara Bagan Durga Puja in src/data/pujo-batch5.js
Updated Hide Road Durga Puja Pandal in src/data/pujo-batch5.js
Updated Shree Shree Sarbojanin Durga Puja in src/data/pujo-batch5.js
Updated Khidderpore Nabarag in src/data/pujo-batch5.js
Updated Udaya Kidderpore in src/data/pujo-batch5.js
Updated Khidderpore Sarbojanin Durgotsov in src/data/pujo-batch5.js
Updated Dahighat Durga Puja Committee in src/data/pujo-batch5.js
Updated Tangra Housing Durga Puja Ground in src/data/pujo-batch5.js
Updated Betbagan Durga Pandal in src/data/pujo-batch5.js
Updated Entally Sen Villa Durga Puja in src/data/pujo-batch5.js
Updated 14 Pally Udayan Sangha in src/data/pujo-batch5.js
Updated Taltala Children's Park Sarbojanin in src/data/pujo-batch5.js
Updated Ramgopal Saha's House Durga Puja in src/data/pujo-batch5.js
Updated Mitram Athletic Club Durga Puja in src/data/pujo-batch5.js
Updated Nilmani Dey's Thakur Bari in src/data/pujo-batch5.js
Updated Madhya Kolkata Malanga Lane Bayam Samity-Akal Bodhon Puja in src/data/pujo-batch5.js
Updated 47 Pally Jubakbrinda in src/data/pujo-batch5.js
Updated Metropolitan Durga Bari in src/data/pujo-batch5.js
Updated Rasmoni Bagan Durga Temple in src/data/pujo-batch5.js
`;

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
