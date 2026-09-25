const fs = require('fs');
let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

css = css.replace(
  /\.pujo-theme-pagination \{\s*display: flex;\s*justify-content: left;\s*gap: 6px;\s*margin-bottom: 3px;\s*\}/,
  `.pujo-theme-pagination {
  display: flex;
  justify-content: left;
  gap: 6px;
  margin-bottom: 0px;
}`
);

fs.writeFileSync('src/components/PujoThemeCards.css', css, 'utf8');
console.log("Updated margin-bottom for pagination dots to 0px");
