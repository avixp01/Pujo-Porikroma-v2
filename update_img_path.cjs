const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "\/Hindusthan Park 1\.jpg" \}/,
  `{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "/Hindusthan-Park-1.png" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated image to Hindusthan-Park-1.png");
