const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 4, title: "Suruchi Sangha", subtitle: "Explore Pujo Theme", image: "\/Suruchi-Sangha1\.jpg", images: \["\/Suruchi-Sangha1\.jpg", "\/Suruchi-Sangha2\.jpg"\] \}/,
  `{ id: 4, title: "Suruchi Sangha", subtitle: "Explore Pujo Theme", image: "/Suruchi-Sangha1.jpg", images: ["/Suruchi-Sangha1.jpg", "/Suruchi-Sangha2.jpg"], colorScheme: "red-brown" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Applied red-brown theme to Suruchi Sangha card");
