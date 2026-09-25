const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 8, title: "Kumartuli Park", subtitle: "Explore Pujo Theme", image: "\/Kumartuli-Park1\.jpg", images: \["\/Kumartuli-Park1\.jpg", "\/Kumartuli-Park2\.jpg"\] \}/,
  `{ id: 8, title: "Kumartuli Park", subtitle: "Explore Pujo Theme", image: "/Kumartuli-Park1.jpg", images: ["/Kumartuli-Park1.jpg", "/Kumartuli-Park2.jpg"], colorScheme: "violet" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Applied violet theme to Kumartuli Park card");
