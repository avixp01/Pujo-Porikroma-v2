const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `                    <TileLayer
                      key={isDarkMode ? 'dark' : 'light'}
                      attribution=''
                      url={isDarkMode 
                        ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png\`
                        : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png\`
                      }
                    />`;

const replaceStr = `                    <TileLayer
                      key={isDarkMode ? 'dark' : 'light'}
                      attribution=''
                      url={isDarkMode 
                        ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                        : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                      }
                    />`;

const targetLF = targetStr.replace(/\r\n/g, '\n');
const replaceLF = replaceStr.replace(/\r\n/g, '\n');

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  console.log('done CRLF');
} else if (code.includes(targetLF)) {
  code = code.replace(targetLF, replaceLF);
  console.log('done LF');
} else {
  // If not found, use regex
  const regex = /url=\{isDarkMode\s*\?\s*`https:\/\/{s}\.basemaps\.cartocdn\.com\/dark_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png`\s*:\s*`https:\/\/{s}\.basemaps\.cartocdn\.com\/light_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png`\s*\}/g;
  
  if (regex.test(code)) {
    code = code.replace(regex, `url={isDarkMode 
                        ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                        : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                      }`);
    console.log('done REGEX');
  } else {
    console.log('not found');
  }
}

fs.writeFileSync('src/components/MapPage.jsx', code);
