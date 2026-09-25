const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 8, title: "Kumartuli Park", subtitle: "Explore Pujo Theme", image: "\/Kumartuli-Park1\.jpg", images: \["\/Kumartuli-Park1\.jpg", "\/Kumartuli-Park2\.jpg"\], colorScheme: "violet" \}/,
  `{ id: 8, title: "Kumartuli Park", subtitle: "Explore Pujo Theme", subtitles: ["Potroshova (2025)", "Mati O Shilpi (2026)"], image: "/Kumartuli-Park1.jpg", images: ["/Kumartuli-Park1.jpg", "/Kumartuli-Park2.jpg"], colorScheme: "violet" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated subtitles for Kumartuli Park");
