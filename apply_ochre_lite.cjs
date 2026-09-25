const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(
  /\{ id: 10, title: "Ahiritola Sarbajanin Durgotsav", subtitle: "Explore Pujo Theme", image: "\/Ahiritola-Sarbajanin-Durgotsav1\.jpg", images: \["\/Ahiritola-Sarbajanin-Durgotsav1\.jpg", "\/Ahiritola-Sarbajanin-Durgotsav2\.jpg"\] \}/,
  `{ id: 10, title: "Ahiritola Sarbajanin Durgotsav", subtitle: "Explore Pujo Theme", image: "/Ahiritola-Sarbajanin-Durgotsav1.jpg", images: ["/Ahiritola-Sarbajanin-Durgotsav1.jpg", "/Ahiritola-Sarbajanin-Durgotsav2.jpg"], colorScheme: "ochre-lite" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Applied ochre-lite theme to Ahiritola Sarbajanin Durgotsav card");
