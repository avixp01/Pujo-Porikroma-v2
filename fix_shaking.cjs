const fs = require('fs');
let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

// Add anti-jitter CSS to h3 and its children
css = css.replace(
  /\.pujo-theme-info h3 \{\s*margin: 0;\s*font-size: 22px;\s*font-weight: 700;\s*text-align: left;\s*\}/,
  `.pujo-theme-info h3 {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  text-align: left;
  /* Prevent text and SVG jitter during scale transforms */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: translateZ(0);
  backface-visibility: hidden;
}`
);

fs.writeFileSync('src/components/PujoThemeCards.css', css, 'utf8');
console.log("Added anti-jitter CSS properties");
