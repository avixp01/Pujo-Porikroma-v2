const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

// 1. Update the Kalyani ITI More card to include subtitles
code = code.replace(
  /\{ id: 7, title: "Kalyani ITI More Luminos Club", subtitle: "Explore Pujo Theme", image: "\/Kalyani-ITI-1\.png", images: \["\/Kalyani-ITI-1\.png", "\/Kalyani-ITI-2\.jpg"\], colorScheme: "ochre" \}/,
  `{ id: 7, title: "Kalyani ITI More Luminos Club", subtitle: "Explore Pujo Theme", subtitles: ["Hsinbyume Pagoda from Myanmar (2025)", "Swe Taw Myat Pagoda of Myanmar (2026)"], image: "/Kalyani-ITI-1.png", images: ["/Kalyani-ITI-1.png", "/Kalyani-ITI-2.jpg"], colorScheme: "ochre" }`
);

// 2. Update the JSX rendering to support dynamic subtitles
code = code.replace(
  /<p>\{theme\.subtitle\}<\/p>/,
  `<p>{theme.subtitles ? theme.subtitles[cardImageIndexes[theme.id] || 0] : theme.subtitle}</p>`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated JSX with dynamic subtitles and added to Kalyani");
