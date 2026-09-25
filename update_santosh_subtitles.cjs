const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 1, title: "Santosh Mitra Square", subtitle: "Explore Pujo Theme", image: "\/Santosh-Mitra-Square1\.jpg", images: \["\/Santosh-Mitra-Square1\.jpg", "\/Santosh-Mitra-Square2\.jpg"\], colorScheme: "black-ochre" \}/,
  `{ id: 1, title: "Santosh Mitra Square", subtitle: "Explore Pujo Theme", subtitles: ["Operation Sindoor (2025)", "Vande Mataram (2026)"], image: "/Santosh-Mitra-Square1.jpg", images: ["/Santosh-Mitra-Square1.jpg", "/Santosh-Mitra-Square2.jpg"], colorScheme: "black-ochre" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated subtitles for Santosh Mitra Square");
