const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Use regex to insert it right after the ">" of the dropdown container
const dropdownRegex = /(maxHeight:\s*'65vh'\s*\}\}\s*>)/;
code = code.replace(dropdownRegex, '$1\n                {/* UNCONDITIONAL NEARBY HEADING */}\n                <div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400 mb-1">NEARBY</div>');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Force-inserted NEARBY unconditionally using regex.');
