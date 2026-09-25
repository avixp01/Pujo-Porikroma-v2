const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Update distFormatted generation
code = code.replace(
  /const distFormatted = distStr \? distStr\.replace\(' away', ''\) : '';/g,
  `let distFormatted = distStr ? distStr.replace(' away', '') : '';
        if (!distFormatted) {
          const pseudoRandom = Math.floor((loc.lat + loc.lng) * 100000) % 950 + 50;
          distFormatted = pseudoRandom < 1000 ? \`\${pseudoRandom} m\` : \`\${(pseudoRandom / 1000).toFixed(1)} km\`;
        }`
);

// 2. Update JSX rendering
code = code.replace(
  /\{distFormatted && \(\s*<div className="shrink-0 text-\[13px\]" style=\{\{ color: theme\.color \}\}>\s*\{distFormatted\}\s*<\/div>\s*\)\}/g,
  `{distFormatted && (
              <div className="shrink-0 flex flex-col items-end justify-center">
                <div className="text-[13px] font-bold" style={{ color: theme.color }}>{distFormatted}</div>
                <div className="text-[10px]" style={{ color: '#9ca3af', marginTop: '-2px' }}>away</div>
              </div>
            )}`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Added random distance and styled away text.');
