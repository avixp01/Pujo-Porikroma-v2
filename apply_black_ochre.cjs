const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 1, title: "Santosh Mitra Square", subtitle: "Explore Pujo Theme", image: "\/Santosh-Mitra-Square1\.jpg", images: \["\/Santosh-Mitra-Square1\.jpg", "\/Santosh-Mitra-Square2\.jpg"\] \}/,
  `{ id: 1, title: "Santosh Mitra Square", subtitle: "Explore Pujo Theme", image: "/Santosh-Mitra-Square1.jpg", images: ["/Santosh-Mitra-Square1.jpg", "/Santosh-Mitra-Square2.jpg"], colorScheme: "black-ochre" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Applied black-ochre theme to Santosh Mitra Square card");
