const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

const ochreStyles = `
/* Ochre Theme overrides */
.pujo-theme-card.theme-ochre {
  background-color: #b3833d;
}

.pujo-theme-card.theme-ochre .pujo-theme-gradient {
  background: linear-gradient(to top, rgba(50, 25, 10, 1) 0%, rgba(130, 75, 30, 0.9) 40%, rgba(180, 130, 50, 0.5) 70%, transparent 100%);
}

.pujo-theme-card.theme-ochre .pujo-explore-action {
  background: #3e2211;
}

.pujo-theme-card.theme-ochre .explore-text,
.pujo-theme-card.theme-ochre .arrow-btn {
  color: #ffffff;
}

.pujo-theme-card.theme-ochre .arrow-btn:hover {
  color: #dddddd;
}
`;

fs.writeFileSync('src/components/PujoThemeCards.css', css + ochreStyles, 'utf8');
console.log("Added ochre theme CSS");
