const fs = require('fs');
let css = fs.readFileSync('src/components/CreatorCard.css', 'utf8');

// Replace width and height of creator-avatar
css = css.replace(/width: 140px;/, 'width: 135px;');
css = css.replace(/height: 140px;/, 'height: 135px;');

// Add margin-right to creator-avatar to increase the right edge space
if (!css.includes('margin-right: 16px; /* Added to increase right edge spacing */')) {
  css = css.replace(
    /\.creator-avatar \{/,
    `.creator-avatar {
  margin-right: 16px; /* Added to increase right edge spacing */`
  );
}

fs.writeFileSync('src/components/CreatorCard.css', css, 'utf8');
console.log("Updated avatar size and spacing");
