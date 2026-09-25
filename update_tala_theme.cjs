const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 3, title: "Tala Prattoy", subtitle: "Explore Pujo Theme", image: "\/tala-prottoy1\.jpg", images: \["\/tala-prottoy1\.jpg", "\/tala-prottoy2\.jpg"\] \}/,
  `{ id: 3, title: "Tala Prattoy", subtitle: "Explore Pujo Theme", image: "/tala-prottoy1.jpg", images: ["/tala-prottoy1.jpg", "/tala-prottoy2.jpg"], colorScheme: "brown" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Added brown theme to Tala Prattoy");
