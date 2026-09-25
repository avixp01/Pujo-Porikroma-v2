const fs = require('fs');

// 1. Revert index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

const styleRegex = /<style id="initial-theme">[\s\S]*?<\/style>\s*/;
indexHtml = indexHtml.replace(styleRegex, '');

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Reverted index.html');

// 2. Revert index.css
let indexCss = fs.readFileSync('src/index.css', 'utf8');
indexCss = indexCss.replace('--bg-dark: #5C3A21;', '--bg-dark: #121212;');
fs.writeFileSync('src/index.css', indexCss, 'utf8');
console.log('Reverted index.css');
