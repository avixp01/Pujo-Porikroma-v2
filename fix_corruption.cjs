const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Fix minus button
code = code.replace(
  /onClick=\{\(e\) => \{ e\.stopPropagation\(\); map\.zoomOut\(\); \}\}>\s*<span[^>]*>.*?<\/span>/,
  'onClick={(e) => { e.stopPropagation(); map.zoomOut(); }}>\n        <span style={{ fontSize: \'28px\', fontWeight: \'500\', paddingBottom: \'4px\' }} className="leading-none text-gray-700">−</span>'
);

// 2. Fix emojis in getEmoji
code = code.replace(/if \(t === 'pandal'\) return '.*?';/, "if (t === 'pandal') return '⛩️';");
code = code.replace(/if \(t === 'metro'\) return '.*?';/, "if (t === 'metro') return '🚇';");
code = code.replace(/if \(t === 'toilet'\) return '.*?';/, "if (t === 'toilet') return '🚻';");
code = code.replace(/if \(t === 'train'\) return '.*?';/, "if (t === 'train') return '🚆';");

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed minus button and emojis.');
