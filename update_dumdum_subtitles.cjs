const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 6, title: "Dum Dum Park Bharat Chakra", subtitle: "Explore Pujo Theme", image: "\/DumDum-Park-BharatChakra1\.jpg", images: \["\/DumDum-Park-BharatChakra1\.jpg", "\/DumDum-Park-BharatChakra2\.jpg"\], colorScheme: "black" \}/,
  `{ id: 6, title: "Dum Dum Park Bharat Chakra", subtitle: "Explore Pujo Theme", subtitles: ["Tanmatra (The Aura) (2025)", "Antaryami (অন্তর্যামী) (2026)"], image: "/DumDum-Park-BharatChakra1.jpg", images: ["/DumDum-Park-BharatChakra1.jpg", "/DumDum-Park-BharatChakra2.jpg"], colorScheme: "black" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated subtitles for Dum Dum Park Bharat Chakra");
