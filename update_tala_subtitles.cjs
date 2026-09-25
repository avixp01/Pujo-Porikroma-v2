const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 3, title: "Tala Prattoy", subtitle: "Explore Pujo Theme", image: "\/tala-prottoy1\.jpg", images: \["\/tala-prottoy1\.jpg", "\/tala-prottoy2\.jpg"\], colorScheme: "brown" \}/,
  `{ id: 3, title: "Tala Prattoy", subtitle: "Explore Pujo Theme", subtitles: ["Bij Angan (2025)", "not been officially announced yet (2026)"], image: "/tala-prottoy1.jpg", images: ["/tala-prottoy1.jpg", "/tala-prottoy2.jpg"], colorScheme: "brown" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated subtitles for Tala Prattoy");
