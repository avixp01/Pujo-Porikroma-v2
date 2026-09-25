const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "\/Hindusthan-Park-1\.png" \}/,
  `{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "/Hindusthan-Park-1.png", colorScheme: "brown" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Restored colorScheme: 'brown' for Hindusthan Park");
