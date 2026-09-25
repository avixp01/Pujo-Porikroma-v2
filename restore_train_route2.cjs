const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /\{\(!selectedLocation \|\| selectedLocation\.type === 'pandal'\) && \(\s*<button className="btn-route">/;
const replacement = `{(!selectedLocation || selectedLocation.type === 'pandal' || selectedLocation.type === 'train') && (\n                <button className="btn-route">`;

code = code.replace(regex, replacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully restored Route button with regex");
