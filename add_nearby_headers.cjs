const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Add NEARBY to LOCATION OFF branch
code = code.replace(
  "// LOCATION OFF: TRENDING CATEGORIES\r\n                        <>\r\n                          {formattedPujos.slice",
  "// LOCATION OFF: TRENDING CATEGORIES\r\n                        <>\r\n                          <div className=\"px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400\">NEARBY</div>\r\n                          {formattedPujos.slice"
);
// fallback for \n
code = code.replace(
  "// LOCATION OFF: TRENDING CATEGORIES\n                        <>\n                          {formattedPujos.slice",
  "// LOCATION OFF: TRENDING CATEGORIES\n                        <>\n                          <div className=\"px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400\">NEARBY</div>\n                          {formattedPujos.slice"
);

// Add NEARBY to LOCATION ON branch
code = code.replace(
  "                          )}\r\n                          {nearbySearchList.length > 0 ?",
  "                          )}\r\n                          <div className=\"px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400\">NEARBY</div>\r\n                          {nearbySearchList.length > 0 ?"
);
// fallback for \n
code = code.replace(
  "                          )}\n                          {nearbySearchList.length > 0 ?",
  "                          )}\n                          <div className=\"px-5 py-2 text-[11px] font-bold tracking-wider text-gray-400\">NEARBY</div>\n                          {nearbySearchList.length > 0 ?"
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Added NEARBY headers.');
