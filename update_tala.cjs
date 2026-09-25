const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 3, title: "Tala Prattoy", subtitle: "Explore Pujo Theme", image: "https:\/\/images\.unsplash\.com\/photo-1502602881226-2cb8da0eb11a\?ixlib=rb-4\.0\.3&auto=format&fit=crop&w=800&q=80" \}/,
  `{ id: 3, title: "Tala Prattoy", subtitle: "Explore Pujo Theme", image: "/tala-prottoy1.jpg", images: ["/tala-prottoy1.jpg", "/tala-prottoy2.jpg"] }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated Tala Prattoy card with new images");
