const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 6, title: "Dum Dum Park Bharat Chakra", subtitle: "Explore Pujo Theme", image: "https:\/\/images\.unsplash\.com\/photo-1502602881226-2cb8da0eb11a\?ixlib=rb-4\.0\.3&auto=format&fit=crop&w=800&q=80" \}/,
  `{ id: 6, title: "Dum Dum Park Bharat Chakra", subtitle: "Explore Pujo Theme", image: "/DumDum-Park-BharatChakra1.jpg", images: ["/DumDum-Park-BharatChakra1.jpg", "/DumDum-Park-BharatChakra2.jpg"] }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated Dum Dum Park Bharat Chakra card with new images");
