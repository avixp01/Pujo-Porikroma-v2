const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Revert width="20" height="20"
code = code.replace(/<div className="thick-mask-icon" style={{ width: "20px", height: "20px", WebkitMaskImage: "url\(\/pandel-icon\.png\)", maskImage: "url\(\/pandel-icon\.png\)" }} \/>/g, 
  '<img src="/pandel-icon.png" width="20" height="20" alt="pandal" style={{ filter: isDarkMode ? \'invert(1)\' : \'none\' }} />');

code = code.replace(/<div className="thick-mask-icon" style={{ width: "20px", height: "20px", WebkitMaskImage: "url\(\/toilet-icon\.png\)", maskImage: "url\(\/toilet-icon\.png\)" }} \/>/g, 
  '<img src="/toilet-icon.png" width="20" height="20" alt="toilet" style={{ filter: isDarkMode ? \'invert(1)\' : \'none\' }} />');

code = code.replace(/<div className="thick-mask-icon" style={{ width: "20px", height: "20px", WebkitMaskImage: "url\(\/metro-icon\.png\)", maskImage: "url\(\/metro-icon\.png\)" }} \/>/g, 
  '<img src="/metro-icon.png" width="20" height="20" alt="metro" style={{ filter: isDarkMode ? \'invert(1)\' : \'none\' }} />');

code = code.replace(/<div className="thick-mask-icon" style={{ width: "20px", height: "20px", WebkitMaskImage: "url\(\/train-icon\.png\)", maskImage: "url\(\/train-icon\.png\)" }} \/>/g, 
  '<img src="/train-icon.png" width="20" height="20" alt="train" style={{ filter: isDarkMode ? \'invert(1)\' : \'none\' }} />');

// Revert width="14" height="14" back to width="12" height="12"
code = code.replace(/<div className="thick-mask-icon" style={{ width: "14px", height: "14px", WebkitMaskImage: "url\(\/pandel-icon\.png\)", maskImage: "url\(\/pandel-icon\.png\)", marginRight: "4px" }} \/>/g, 
  '<img src="/pandel-icon.png" width="12" height="12" alt="pandal" style={{ filter: isDarkMode ? \'invert(1)\' : \'none\' }} />');

code = code.replace(/<div className="thick-mask-icon" style={{ width: "14px", height: "14px", WebkitMaskImage: "url\(\/toilet-icon\.png\)", maskImage: "url\(\/toilet-icon\.png\)", marginRight: "4px" }} \/>/g, 
  '<img src="/toilet-icon.png" width="12" height="12" alt="toilet" style={{ filter: isDarkMode ? \'invert(1)\' : \'none\' }} />');

code = code.replace(/<div className="thick-mask-icon" style={{ width: "14px", height: "14px", WebkitMaskImage: "url\(\/metro-icon\.png\)", maskImage: "url\(\/metro-icon\.png\)", marginRight: "4px" }} \/>/g, 
  '<img src="/metro-icon.png" width="12" height="12" alt="metro" style={{ filter: isDarkMode ? \'invert(1)\' : \'none\' }} />');

code = code.replace(/<div className="thick-mask-icon" style={{ width: "14px", height: "14px", WebkitMaskImage: "url\(\/train-icon\.png\)", maskImage: "url\(\/train-icon\.png\)", marginRight: "4px" }} \/>/g, 
  '<img src="/train-icon.png" width="12" height="12" alt="train" style={{ filter: isDarkMode ? \'invert(1)\' : \'none\' }} />');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully reverted filter icons");
