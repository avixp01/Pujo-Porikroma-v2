const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

css = css.replace(
  /\.pujo-theme-pagination \.dot \{\s*width: 17px;/,
  `.pujo-theme-pagination .dot {
  width: 10px;`
);

fs.writeFileSync('src/components/PujoThemeCards.css', css, 'utf8');
console.log("Reduced dot width in CSS");
