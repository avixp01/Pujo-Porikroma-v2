const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex1 = /case 'train':[\s\S]*?bg: '#f3e8ff',[\s\S]*?icon: <svg[\s\S]*?<\/svg>[\s\S]*?};/;
const replacement1 = case 'train': \n          return { \n            color: '#9333ea', \n            bg: '#f3e8ff', \n            icon: <img src=\"/train-icon.png\" width=\"20\" height=\"20\" alt=\"train\" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} /> \n          };;
code = code.replace(regex1, replacement1);

const regex2 = /<button[\s\S]*?onClick=\{\(\) => setActiveFilter\(activeFilter === 'train' \? 'all' : 'train'\)\}[\s\S]*?className=\{.+active-train.+\}[\s\S]*?>[\s\S]*?<svg[\s\S]*?<\/svg>[\s\S]*?TRAIN[\s\S]*?<\/button>/;
const replacement2 = <button \n              onClick={() => setActiveFilter(activeFilter === 'train' ? 'all' : 'train')}\n              className={\map-filter-pill \\}\n            >\n              <img src=\"/train-icon.png\" width=\"12\" height=\"12\" alt=\"train\" style={{ filter: isDarkMode ? 'invert(1)' : 'none' }} />\n              TRAIN\n            </button>;
code = code.replace(regex2, replacement2);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Replaced train button icons.');
