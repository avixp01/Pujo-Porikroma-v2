const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace width="20" height="20"
code = code.replace(/<img src="\/pandel-icon\.png" width="20" height="20" alt="pandal" style={{ filter: isDarkMode \? 'invert\(1\)' : 'none' }} \/>/g, 
  '<div className="thick-mask-icon" style={{ width: "20px", height: "20px", WebkitMaskImage: "url(/pandel-icon.png)", maskImage: "url(/pandel-icon.png)" }} />');

code = code.replace(/<img src="\/toilet-icon\.png" width="20" height="20" alt="toilet" style={{ filter: isDarkMode \? 'invert\(1\)' : 'none' }} \/>/g, 
  '<div className="thick-mask-icon" style={{ width: "20px", height: "20px", WebkitMaskImage: "url(/toilet-icon.png)", maskImage: "url(/toilet-icon.png)" }} />');

code = code.replace(/<img src="\/metro-icon\.png" width="20" height="20" alt="metro" style={{ filter: isDarkMode \? 'invert\(1\)' : 'none' }} \/>/g, 
  '<div className="thick-mask-icon" style={{ width: "20px", height: "20px", WebkitMaskImage: "url(/metro-icon.png)", maskImage: "url(/metro-icon.png)" }} />');

code = code.replace(/<img src="\/train-icon\.png" width="20" height="20" alt="train" style={{ filter: isDarkMode \? 'invert\(1\)' : 'none' }} \/>/g, 
  '<div className="thick-mask-icon" style={{ width: "20px", height: "20px", WebkitMaskImage: "url(/train-icon.png)", maskImage: "url(/train-icon.png)" }} />');

// Replace width="12" height="12"
code = code.replace(/<img src="\/pandel-icon\.png" width="12" height="12" alt="pandal" style={{ filter: isDarkMode \? 'invert\(1\)' : 'none' }} \/>/g, 
  '<div className="thick-mask-icon" style={{ width: "14px", height: "14px", WebkitMaskImage: "url(/pandel-icon.png)", maskImage: "url(/pandel-icon.png)", marginRight: "4px" }} />');

code = code.replace(/<img src="\/toilet-icon\.png" width="12" height="12" alt="toilet" style={{ filter: isDarkMode \? 'invert\(1\)' : 'none' }} \/>/g, 
  '<div className="thick-mask-icon" style={{ width: "14px", height: "14px", WebkitMaskImage: "url(/toilet-icon.png)", maskImage: "url(/toilet-icon.png)", marginRight: "4px" }} />');

code = code.replace(/<img src="\/metro-icon\.png" width="12" height="12" alt="metro" style={{ filter: isDarkMode \? 'invert\(1\)' : 'none' }} \/>/g, 
  '<div className="thick-mask-icon" style={{ width: "14px", height: "14px", WebkitMaskImage: "url(/metro-icon.png)", maskImage: "url(/metro-icon.png)", marginRight: "4px" }} />');

code = code.replace(/<img src="\/train-icon\.png" width="12" height="12" alt="train" style={{ filter: isDarkMode \? 'invert\(1\)' : 'none' }} \/>/g, 
  '<div className="thick-mask-icon" style={{ width: "14px", height: "14px", WebkitMaskImage: "url(/train-icon.png)", maskImage: "url(/train-icon.png)", marginRight: "4px" }} />');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully replaced filter icons with thick masks");
