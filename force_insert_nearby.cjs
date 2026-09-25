const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Remove the previously added conditional NEARBY headers
code = code.replace(
  /<div className="px-5 py-2 text-\[11px\] font-bold tracking-wider text-gray-400 mb-1">NEARBY<\/div>\n/g,
  ''
);

// Add the unconditional NEARBY header exactly at the top of the dropdown container
const targetDivStart = "maxHeight: '65vh'\r\n                }}\r\n              >";
const replacementDivStart = targetDivStart + "\r\n                {/* UNCONDITIONAL NEARBY HEADING */}\r\n                <div className=\"px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400 mb-1\">NEARBY</div>";

code = code.replace(targetDivStart, replacementDivStart);

// Fallback for \n
const targetDivStartLF = "maxHeight: '65vh'\n                }}\n              >";
const replacementDivStartLF = targetDivStartLF + "\n                {/* UNCONDITIONAL NEARBY HEADING */}\n                <div className=\"px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400 mb-1\">NEARBY</div>";
code = code.replace(targetDivStartLF, replacementDivStartLF);


fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Force-inserted NEARBY unconditionally.');
