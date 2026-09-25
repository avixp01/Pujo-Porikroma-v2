const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

const yellowGreenStyles = `
/* Yellow-Green Theme overrides */
.pujo-theme-card.theme-yellow-green {
  background-color: #6b704c;
}

.pujo-theme-card.theme-yellow-green .pujo-theme-gradient {
  background: linear-gradient(to top, rgba(60, 50, 20, 1) 0%, rgba(90, 80, 40, 0.9) 40%, rgba(107, 112, 76, 0.5) 70%, transparent 100%);
}

.pujo-theme-card.theme-yellow-green .pujo-explore-action {
  background: #4a3018;
}

.pujo-theme-card.theme-yellow-green .explore-text,
.pujo-theme-card.theme-yellow-green .arrow-btn {
  color: #dcb680;
}

.pujo-theme-card.theme-yellow-green .arrow-btn:hover {
  color: #ffdda1;
}
`;

fs.writeFileSync('src/components/PujoThemeCards.css', css + yellowGreenStyles, 'utf8');
console.log("Added yellow-green theme CSS");
