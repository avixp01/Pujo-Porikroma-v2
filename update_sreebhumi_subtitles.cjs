const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 2, title: "Sreebhumi Sporting Club", subtitle: "Explore Pujo Theme", image: "\/Sreebhumi-Sporting-Club1\.jpg", images: \["\/Sreebhumi-Sporting-Club1\.jpg", "\/Sreebhumi-Sporting-Club2\.jpg"\], colorScheme: "yellow-green" \}/,
  `{ id: 2, title: "Sreebhumi Sporting Club", subtitle: "Explore Pujo Theme", subtitles: ["Swaminarayan Akshardham Temple (2025)", "Rajasthan Hawa Mahal (2026)"], image: "/Sreebhumi-Sporting-Club1.jpg", images: ["/Sreebhumi-Sporting-Club1.jpg", "/Sreebhumi-Sporting-Club2.jpg"], colorScheme: "yellow-green" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated subtitles for Sreebhumi Sporting Club");
