const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.css', 'utf8');

const cssToAdd = `

/* Remove default tap highlight on mobile for all interactive elements */
button, a, .map-action-btn, .map-filter-pill, .map-bottom-nav button {
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;
}

button:focus, a:focus, .map-action-btn:focus, .map-filter-pill:focus {
  outline: none !important;
}
`;

if (!code.includes('-webkit-tap-highlight-color')) {
    code += cssToAdd;
    fs.writeFileSync('src/components/MapPage.css', code, 'utf8');
    console.log("Successfully added tap highlight removal");
} else {
    console.log("Already present");
}
