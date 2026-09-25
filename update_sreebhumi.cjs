const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 2, title: "Sreebhumi Sporting Club", subtitle: "Explore Pujo Theme", image: "https:\/\/images\.unsplash\.com\/photo-1513635269975-59663e0ac1ad\?ixlib=rb-4\.0\.3&auto=format&fit=crop&w=800&q=80" \}/,
  `{ id: 2, title: "Sreebhumi Sporting Club", subtitle: "Explore Pujo Theme", image: "/Sreebhumi-Sporting-Club1.jpg", images: ["/Sreebhumi-Sporting-Club1.jpg", "/Sreebhumi-Sporting-Club2.jpg"] }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated Sreebhumi Sporting Club card with new images");
