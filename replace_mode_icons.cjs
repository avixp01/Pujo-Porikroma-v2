const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target1 = '<Car size={24} />';
const replace1 = '<img src="/icn-1.png" style={{ width: \'24px\', height: \'24px\', filter: isDarkMode ? \'invert(1)\' : \'none\' }} alt="icn-1" />';

const target2 = '<Bike size={24} />';
const replace2 = '<img src="/icn-2.png" style={{ width: \'24px\', height: \'24px\', filter: isDarkMode ? \'invert(1)\' : \'none\' }} alt="icn-2" />';

const target3 = '<Train size={24} />';
const replace3 = '<img src="/icn-3.png" style={{ width: \'24px\', height: \'24px\', filter: isDarkMode ? \'invert(1)\' : \'none\' }} alt="icn-3" />';

const target4 = '<Footprints size={24} />';
const replace4 = '<img src="/icn-4.png" style={{ width: \'24px\', height: \'24px\', filter: isDarkMode ? \'invert(1)\' : \'none\' }} alt="icn-4" />';

if (code.includes(target1) && code.includes(target2) && code.includes(target3) && code.includes(target4)) {
    code = code.replace(target1, replace1);
    code = code.replace(target2, replace2);
    code = code.replace(target3, replace3);
    code = code.replace(target4, replace4);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Successfully replaced the 4 icons");
} else {
    console.log("Could not find the target icons");
}
