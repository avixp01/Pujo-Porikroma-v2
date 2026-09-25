const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

// 1. Replace initialThemeData with randomized state logic
const newCards = `
const themes = [
  { id: 1, title: "Santosh Mitra Square", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1512453979436-5a50c640d5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Sreebhumi Sporting Club", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Tala Prattoy", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1502602881226-2cb8da0eb11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Suruchi Sangha", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1512453979436-5a50c640d5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Kashi Bose Lane", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Dum Dum Park Bharat Chakra", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1502602881226-2cb8da0eb11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 7, title: "Kalyani ITI More Luminos Club", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1512453979436-5a50c640d5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 8, title: "Kumartuli Park", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 9, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1502602881226-2cb8da0eb11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 10, title: "Ahiritola Sarbajanin Durgotsav", subtitle: "Explore Pujo Theme", image: "https://images.unsplash.com/photo-1512453979436-5a50c640d5b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

export default function PujoThemeCards() {
  const [themeData] = useState(() => [...themes].sort(() => Math.random() - 0.5));
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % themeData.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + themeData.length) % themeData.length);
  };
`;

code = code.replace(/const initialThemeData = [\s\S]*?const prevCard = \(\) => {[\s\S]*?};/, newCards);

// 2. Replace initialThemeData with themeData in map and calculations
code = code.replace(/initialThemeData\.map/g, "themeData.map");
code = code.replace(/initialThemeData\.length/g, "themeData.length");

// 3. Replace the 3 dots map with exactly 2 dots
const dotsRegex = /\{themeData\.map\(\(_, i\) => \([\s\S]*?<\/span>\s*\)\)\}/;
code = code.replace(dotsRegex, `<span className="dot active-dot"></span>\n                    <span className="dot"></span>`);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Updated PujoThemeCards successfully");
