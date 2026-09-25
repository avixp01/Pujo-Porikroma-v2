const fs = require('fs');
let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

css = css.replace(
  /\.pujo-theme-pagination \.dot \{\s*width: 20px;/,
  `.pujo-theme-pagination .dot {
  width: 17px;`
);

fs.writeFileSync('src/components/PujoThemeCards.css', css, 'utf8');
console.log("Updated pagination dot width");
