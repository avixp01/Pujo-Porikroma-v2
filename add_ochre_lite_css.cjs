const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

const ochreLiteStyles = `
/* Ochre Lite Theme overrides */
.pujo-theme-card.theme-ochre-lite {
  background-color: #c99a53;
}

.pujo-theme-card.theme-ochre-lite .pujo-theme-gradient {
  background: linear-gradient(to top, rgba(80, 50, 20, 1) 0%, rgba(160, 100, 40, 0.9) 40%, rgba(200, 150, 60, 0.5) 70%, transparent 100%);
}

.pujo-theme-card.theme-ochre-lite .pujo-explore-action {
  background: #a06a38;
}

.pujo-theme-card.theme-ochre-lite .explore-text,
.pujo-theme-card.theme-ochre-lite .arrow-btn {
  color: #ffffff;
}

.pujo-theme-card.theme-ochre-lite .arrow-btn:hover {
  color: #dddddd;
}
`;

fs.writeFileSync('src/components/PujoThemeCards.css', css + ochreLiteStyles, 'utf8');
console.log("Added ochre-lite theme CSS");
