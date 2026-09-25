const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace masks in direction-modes with img tags pointing to the top pill icons
code = code.replace(/<div className="custom-mode-icon" style={{ WebkitMaskImage: 'url\(\/pandel-icon\.png\)', maskImage: 'url\(\/pandel-icon\.png\)' }} \/>/g, 
  '<img src="/pandel-icon.png" style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }} alt="pandal mode" />');

code = code.replace(/<div className="custom-mode-icon" style={{ WebkitMaskImage: 'url\(\/toilet-icon\.png\)', maskImage: 'url\(\/toilet-icon\.png\)' }} \/>/g, 
  '<img src="/toilet-icon.png" style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }} alt="toilet mode" />');

code = code.replace(/<div className="custom-mode-icon" style={{ WebkitMaskImage: 'url\(\/metro-icon\.png\)', maskImage: 'url\(\/metro-icon\.png\)' }} \/>/g, 
  '<img src="/metro-icon.png" style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }} alt="metro mode" />');

code = code.replace(/<div className="custom-mode-icon" style={{ WebkitMaskImage: 'url\(\/train-icon\.png\)', maskImage: 'url\(\/train-icon\.png\)' }} \/>/g, 
  '<img src="/train-icon.png" style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }} alt="train mode" />');

// Just in case they are still icn-1.png etc
code = code.replace(/<div className="custom-mode-icon" style={{ WebkitMaskImage: 'url\(\/icn-1\.png\)', maskImage: 'url\(\/icn-1\.png\)' }} \/>/g, 
  '<img src="/pandel-icon.png" style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }} alt="pandal mode" />');

code = code.replace(/<div className="custom-mode-icon" style={{ WebkitMaskImage: 'url\(\/icn-2\.png\)', maskImage: 'url\(\/icn-2\.png\)' }} \/>/g, 
  '<img src="/toilet-icon.png" style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }} alt="toilet mode" />');

code = code.replace(/<div className="custom-mode-icon" style={{ WebkitMaskImage: 'url\(\/icn-3\.png\)', maskImage: 'url\(\/icn-3\.png\)' }} \/>/g, 
  '<img src="/metro-icon.png" style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }} alt="metro mode" />');

code = code.replace(/<div className="custom-mode-icon" style={{ WebkitMaskImage: 'url\(\/icn-4\.png\)', maskImage: 'url\(\/icn-4\.png\)' }} \/>/g, 
  '<img src="/train-icon.png" style={{ width: "24px", height: "24px", filter: isDarkMode ? "invert(1)" : "none" }} alt="train mode" />');


fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully replaced popup icons with standard image tags of pill icons");
