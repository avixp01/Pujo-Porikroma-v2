const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 5, title: "Kashi Bose Lane", subtitle: "Explore Pujo Theme", image: "\/kashi-bose-lane1\.jpg", images: \["\/kashi-bose-lane1\.jpg", "\/kashi-bose-lane2\.jpg"\] \}/,
  `{ id: 5, title: "Kashi Bose Lane", subtitle: "Explore Pujo Theme", image: "/kashi-bose-lane1.jpg", images: ["/kashi-bose-lane1.jpg", "/kashi-bose-lane2.jpg"], colorScheme: "ochre" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Added ochre theme to Kashi Bose Lane");
