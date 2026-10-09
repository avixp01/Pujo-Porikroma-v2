const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<TileLayer\s*url=\{isDarkMode \? 'https:\/\/{s}\.basemaps\.cartocdn\.com\/dark_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png' : 'https:\/\/{s}\.basemaps\.cartocdn\.com\/light_all\/\{z\}\/\{x\}\/\{y\}\{r\}\.png'\}\s*\/>/g;

const replacement = `<TileLayer
                          url={isDarkMode 
                            ? \`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                            : \`https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=\${import.meta.env.VITE_CARTO_API_KEY || 'cb1_2zpy_1_5578b74846ef709b32860fd7'}\`
                          }
                        />`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Updated TileLayer API key!");
} else {
    console.log("Could not find the TileLayer!");
}
