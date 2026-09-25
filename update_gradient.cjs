const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

css = css.replace(
  /background: linear-gradient\(to top, rgba\(62, 39, 35, 0\.95\) 0%, rgba\(62, 39, 35, 0\.6\) 50%, transparent 100%\);/,
  `background: linear-gradient(to top, rgba(20, 10, 5, 1) 0%, rgba(45, 25, 20, 0.9) 40%, rgba(62, 39, 35, 0.5) 70%, transparent 100%);`
);

fs.writeFileSync('src/components/PujoThemeCards.css', css, 'utf8');
console.log("Updated brown theme gradient");
