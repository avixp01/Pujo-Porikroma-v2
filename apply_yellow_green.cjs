const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 2, title: "Sreebhumi Sporting Club", subtitle: "Explore Pujo Theme", image: "\/Sreebhumi-Sporting-Club1\.jpg", images: \["\/Sreebhumi-Sporting-Club1\.jpg", "\/Sreebhumi-Sporting-Club2\.jpg"\] \}/,
  `{ id: 2, title: "Sreebhumi Sporting Club", subtitle: "Explore Pujo Theme", image: "/Sreebhumi-Sporting-Club1.jpg", images: ["/Sreebhumi-Sporting-Club1.jpg", "/Sreebhumi-Sporting-Club2.jpg"], colorScheme: "yellow-green" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Applied yellow-green theme to Sreebhumi Sporting Club card");
