const fs = require('fs');

let css = fs.readFileSync('src/components/PujoThemeCards.css', 'utf8');

const violetThemeStyles = `
/* Violet Theme overrides */
.pujo-theme-card.theme-violet {
  background-color: #492a82;
}

.pujo-theme-card.theme-violet .pujo-theme-gradient {
  background: linear-gradient(to top, rgba(15, 10, 40, 1) 0%, rgba(35, 20, 80, 0.9) 40%, rgba(73, 42, 130, 0.5) 70%, transparent 100%);
}

.pujo-theme-card.theme-violet .pujo-explore-action {
  background: #3b1c6d;
}

.pujo-theme-card.theme-violet .explore-text,
.pujo-theme-card.theme-violet .arrow-btn {
  color: #b491fb;
}

.pujo-theme-card.theme-violet .arrow-btn:hover {
  color: #e5d4ff;
}
`;

fs.writeFileSync('src/components/PujoThemeCards.css', css + violetThemeStyles, 'utf8');
console.log("Added violet theme CSS");
