const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "\/Hindusthan-Park-1\.png", images: \["\/Hindusthan-Park-1\.png", "\/Hindusthan-Park-2\.png"\], colorScheme: "brown" \}/,
  `{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", subtitles: ["Lokoj (2025)", "not been officially announced yet (2026)"], image: "/Hindusthan-Park-1.png", images: ["/Hindusthan-Park-1.png", "/Hindusthan-Park-2.png"], colorScheme: "brown" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated subtitles for Hindusthan Park");
