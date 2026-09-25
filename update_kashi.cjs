const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 5, title: "Kashi Bose Lane", subtitle: "Explore Pujo Theme", image: "https:\/\/images\.unsplash\.com\/photo-1513635269975-59663e0ac1ad\?ixlib=rb-4\.0\.3&auto=format&fit=crop&w=800&q=80" \}/,
  `{ id: 5, title: "Kashi Bose Lane", subtitle: "Explore Pujo Theme", image: "/kashi-bose-lane1.jpg", images: ["/kashi-bose-lane1.jpg", "/kashi-bose-lane2.jpg"] }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated Kashi Bose Lane card with new images");
