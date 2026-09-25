const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

// 1. Update themes array
code = code.replace(
  /\{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "\/Hindusthan-Park-1\.png", colorScheme: "brown" \}/,
  `{ id: 11, title: "Hindusthan Park", subtitle: "Explore Pujo Theme", image: "/Hindusthan-Park-1.png", images: ["/Hindusthan-Park-1.png", "/Hindusthan-Park-2.png"], colorScheme: "brown" }`
);

// 2. Add state and toggle function
code = code.replace(
  /const \[activeIndex, setActiveIndex\] = useState\(0\);/,
  `const [activeIndex, setActiveIndex] = useState(0);
  const [cardImageIndexes, setCardImageIndexes] = useState({});

  const toggleCardImage = (e, themeId, imagesArray) => {
    if (!imagesArray || imagesArray.length <= 1) return;
    e.stopPropagation();
    setCardImageIndexes(prev => ({
      ...prev,
      [themeId]: prev[themeId] ? 0 : 1
    }));
  };`
);

// 3. Update img src
code = code.replace(
  /<img src=\{theme\.image\} alt=\{theme\.title\} className="pujo-theme-img" \/>/,
  `<img src={theme.images ? theme.images[cardImageIndexes[theme.id] || 0] : theme.image} alt={theme.title} className="pujo-theme-img" />`
);

// 4. Update the span click handler
code = code.replace(
  /<span style=\{\{ display: 'inline-flex', verticalAlign: 'middle', marginLeft: '6px', fontSize: '16px', fontWeight: 'normal', color: 'white', transform: 'translateZ\(0\)', backfaceVisibility: 'hidden' \}\}>&gt;<\/span>/,
  `<span 
    onClick={(e) => toggleCardImage(e, theme.id, theme.images)}
    style={{ cursor: theme.images && theme.images.length > 1 ? 'pointer' : 'default', display: 'inline-flex', verticalAlign: 'middle', marginLeft: '6px', fontSize: '16px', fontWeight: 'normal', color: 'white', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
  >&gt;</span>`
);

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Added inner-card image carousel functionality");
