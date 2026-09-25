const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

const redBrownStyles = `
/* Red-Brown Theme overrides */
.pujo-theme-card.theme-red-brown {
  background-color: #8b3a3a;
}

.pujo-theme-card.theme-red-brown .pujo-theme-gradient {
  background: linear-gradient(to top, rgba(50, 15, 15, 1) 0%, rgba(90, 30, 30, 0.9) 40%, rgba(139, 58, 58, 0.5) 70%, transparent 100%);
}

.pujo-theme-card.theme-red-brown .pujo-explore-action {
  background: #b86a6a;
}

.pujo-theme-card.theme-red-brown .explore-text,
.pujo-theme-card.theme-red-brown .arrow-btn {
  color: #4a2020;
}

.pujo-theme-card.theme-red-brown .arrow-btn:hover {
  color: #2a1010;
}
`;

fs.writeFileSync('src/components/PujoThemeCards.css', css + redBrownStyles, 'utf8');
console.log("Added red-brown theme CSS");
