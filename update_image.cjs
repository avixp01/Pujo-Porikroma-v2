const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 9, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "https:\/\/images\.unsplash\.com\/photo-[^"]+" \}/,
  `{ id: 9, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "/Hindusthan Park 1.jpg" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated image for Hindusthan Park");
