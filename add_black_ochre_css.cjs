const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

const blackOchreStyles = `
/* Black-Ochre Theme overrides */
.pujo-theme-card.theme-black-ochre {
  background-color: #2a251a;
}

.pujo-theme-card.theme-black-ochre .pujo-theme-gradient {
  background: linear-gradient(to top, rgba(15, 12, 8, 1) 0%, rgba(35, 30, 20, 0.9) 40%, rgba(42, 37, 26, 0.5) 70%, transparent 100%);
}

.pujo-theme-card.theme-black-ochre .pujo-explore-action {
  background: #1f1610;
}

.pujo-theme-card.theme-black-ochre .explore-text,
.pujo-theme-card.theme-black-ochre .arrow-btn {
  color: #dcb680;
}

.pujo-theme-card.theme-black-ochre .arrow-btn:hover {
  color: #ffdda1;
}
`;

fs.writeFileSync('src/components/PujoThemeCards.css', css + blackOchreStyles, 'utf8');
console.log("Added black-ochre theme CSS");
