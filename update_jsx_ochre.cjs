const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

// Update classname dynamic logic
code = code.replace(
  /\$\{theme\.colorScheme === 'brown' \? 'theme-brown' : ''\}/,
  `\${theme.colorScheme ? 'theme-' + theme.colorScheme : ''}`
);

// Add colorScheme to Kalyani ITI
code = code.replace(
  /\{ id: 7, title: "Kalyani ITI More Luminos Club", subtitle: "Explore Pujo Theme", image: "\/Kalyani-ITI-1\.png", images: \["\/Kalyani-ITI-1\.png", "\/Kalyani-ITI-2\.jpg"\] \}/,
  `{ id: 7, title: "Kalyani ITI More Luminos Club", subtitle: "Explore Pujo Theme", image: "/Kalyani-ITI-1.png", images: ["/Kalyani-ITI-1.png", "/Kalyani-ITI-2.jpg"], colorScheme: "ochre" }`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated JSX with dynamic color scheme and added ochre to Kalyani");
