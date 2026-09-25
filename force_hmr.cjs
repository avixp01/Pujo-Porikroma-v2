const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// I will add a tiny visual tweak to trigger HMR, like changing 'NEARBY' to 'NEARBY '
// Actually, I'll just change the class slightly to force a repaint.
code = code.replace(
  /<div className="px-5 py-2 text-\[11px\] font-bold tracking-wider text-gray-400">NEARBY<\/div>/g,
  '<div className="px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400 mb-1">NEARBY</div>'
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Touched file to force HMR update.');
