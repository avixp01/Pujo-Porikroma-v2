const fs = require('fs');

let cssCode = fs.readFileSync('src/components/MapPage.css', 'utf8');

const targetStr = `.dark-mode .nav-bottom-tabs {
  border-bottom-color: #374151 !important;
}`;

const replacementStr = `.nav-bottom-tabs {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: white;
}

.dark-mode .nav-bottom-tabs {
  background-color: #121212;
  border-bottom-color: #374151 !important;
}`;

if (cssCode.includes(targetStr)) {
  cssCode = cssCode.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/MapPage.css', cssCode, 'utf8');
  console.log('Successfully updated MapPage.css to make tabs sticky.');
} else {
  console.log('Target string not found in MapPage.css');
}
