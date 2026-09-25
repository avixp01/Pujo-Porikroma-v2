const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

const blackThemeStyles = `
/* Black Theme overrides */
.pujo-theme-card.theme-black {
  background-color: #111111;
}

.pujo-theme-card.theme-black .pujo-theme-gradient {
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(20, 20, 20, 0.9) 40%, rgba(40, 40, 40, 0.5) 70%, transparent 100%);
}

.pujo-theme-card.theme-black .pujo-explore-action {
  background: #333333;
}

.pujo-theme-card.theme-black .explore-text,
.pujo-theme-card.theme-black .arrow-btn {
  color: #999999;
}

.pujo-theme-card.theme-black .arrow-btn:hover {
  color: #cccccc;
}
`;

fs.writeFileSync('src/components/PujoThemeCards.css', css + blackThemeStyles, 'utf8');
console.log("Added black theme CSS");
