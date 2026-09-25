const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 5, title: "Kashi Bose Lane", subtitle: "Explore Pujo Theme", image: "\/kashi-bose-lane1\.jpg", images: \["\/kashi-bose-lane1\.jpg", "\/kashi-bose-lane2\.jpg"\], colorScheme: "ochre" \}/,
  `{ id: 5, title: "Kashi Bose Lane", subtitle: "Explore Pujo Theme", subtitles: ["Pakdondi (2025)", "not been officially announced yet (2026)"], image: "/kashi-bose-lane1.jpg", images: ["/kashi-bose-lane1.jpg", "/kashi-bose-lane2.jpg"], colorScheme: "ochre" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated Kashi Bose Lane subtitles");
