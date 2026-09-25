const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const t1 = '<img src="/icn-1.png" style={{ width: \'24px\', height: \'24px\', filter: isDarkMode ? \'invert(1)\' : \'none\' }} alt="icn-1" />';
const r1 = '<div className="custom-mode-icon" style={{ WebkitMaskImage: \'url(/icn-1.png)\', maskImage: \'url(/icn-1.png)\' }} />';

const t2 = '<img src="/icn-2.png" style={{ width: \'24px\', height: \'24px\', filter: isDarkMode ? \'invert(1)\' : \'none\' }} alt="icn-2" />';
const r2 = '<div className="custom-mode-icon" style={{ WebkitMaskImage: \'url(/icn-2.png)\', maskImage: \'url(/icn-2.png)\' }} />';

const t3 = '<img src="/icn-3.png" style={{ width: \'24px\', height: \'24px\', filter: isDarkMode ? \'invert(1)\' : \'none\' }} alt="icn-3" />';
const r3 = '<div className="custom-mode-icon" style={{ WebkitMaskImage: \'url(/icn-3.png)\', maskImage: \'url(/icn-3.png)\' }} />';

const t4 = '<img src="/icn-4.png" style={{ width: \'24px\', height: \'24px\', filter: isDarkMode ? \'invert(1)\' : \'none\' }} alt="icn-4" />';
const r4 = '<div className="custom-mode-icon" style={{ WebkitMaskImage: \'url(/icn-4.png)\', maskImage: \'url(/icn-4.png)\' }} />';

code = code.replace(t1, r1);
code = code.replace(t2, r2);
code = code.replace(t3, r3);
code = code.replace(t4, r4);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully replaced image tags with masked divs");
