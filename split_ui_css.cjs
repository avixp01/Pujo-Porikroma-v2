const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Update direction-popup-wrapper class
code = code.replace(
  /<div className=\{\`direction-popup-wrapper \$\{isDarkMode \? 'dark-mode' : ''\}\`\}>/,
  `<div className={\`direction-popup-wrapper \${isDarkMode ? 'dark-mode' : ''} \${navigationDestination ? 'is-navigating' : ''}\`}>`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');

// Update CSS
let css = fs.readFileSync('src/components/MapPage.css', 'utf8');

const newCSS = `

/* Split Navigation Layout */
.direction-popup-wrapper.is-navigating {
  background-color: transparent !important;
  pointer-events: none;
  justify-content: space-between;
}

.direction-popup-wrapper.is-navigating .direction-header {
  pointer-events: auto;
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  margin-bottom: auto;
}
.direction-popup-wrapper.is-navigating.dark-mode .direction-header {
  background-color: #1e1e1e;
}

.direction-popup-wrapper.is-navigating .navigation-details-panel {
  pointer-events: auto;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
  max-height: 55vh;
  flex: none;
}

.dark-mode .nav-bottom-tabs {
  border-bottom-color: #374151 !important;
}
`;

fs.appendFileSync('src/components/MapPage.css', newCSS, 'utf8');
console.log("Updated split navigation styles");
