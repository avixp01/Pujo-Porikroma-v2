const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 11, title: "Demo Card", subtitle: "Explore Pujo Theme", image: "https:\/\/images\.unsplash\.com\/photo-1512453979436-5a50c640d5b2\?ixlib=rb-4\.0\.3&auto=format&fit=crop&w=800&q=80" \}/,
  `{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "/Hindusthan Park 1.jpg" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Renamed Demo Card to Hindusthan Park");
