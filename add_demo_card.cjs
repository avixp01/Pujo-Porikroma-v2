const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

const ahiritolaCard = `{ id: 10, title: "Ahiritola Sarbajanin Durgotsav", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1512453979436-5a50c640d5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }`;
const replacement = `{ id: 10, title: "Ahiritola Sarbajanin Durgotsav", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1512453979436-5a50c640d5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 11, title: "Demo Card", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1512453979436-5a50c640d5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }`;

code = code.replace(ahiritolaCard, replacement);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Added Demo Card");
