const fs = require('fs');
let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

css = css.replace(
  /\.pujo-theme-info p \{\s*margin: 3px 0 15px 0;/,
  `.pujo-theme-info p {
  margin: 3px 0 12px 0;`
);

fs.writeFileSync('src/components/PujoThemeCards.css', css, 'utf8');
console.log("Updated bottom margin on subtitle");
