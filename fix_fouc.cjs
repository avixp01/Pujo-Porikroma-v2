const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Insert styles before </head>
if (!indexHtml.includes('<style id="initial-theme">')) {
  indexHtml = indexHtml.replace('</head>', `
    <style id="initial-theme">
      html, body {
        margin: 0;
        padding: 0;
        background-color: #5C3A21; /* Custom brown theme */
        background-image: linear-gradient(to bottom, #5C3A21, #7c2d12);
        color: #ffffff;
      }
      #root {
        min-height: 100vh;
        width: 100%;
      }
    </style>
  </head>`);
  fs.writeFileSync('index.html', indexHtml, 'utf8');
  console.log('Updated index.html');
}

// 2. Update index.css
let indexCss = fs.readFileSync('src/index.css', 'utf8');
indexCss = indexCss.replace('--bg-dark: #121212;', '--bg-dark: #5C3A21;');
fs.writeFileSync('src/index.css', indexCss, 'utf8');
console.log('Updated index.css');
