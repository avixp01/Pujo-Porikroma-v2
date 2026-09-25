const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// The dropdown is currently inside map-search-container
// Let's move relative back to map-search-bar
mapPageCode = mapPageCode.replace(
  '<div className="map-search-container relative">',
  '<div className="map-search-container">'
);

mapPageCode = mapPageCode.replace(
  /<div className="map-search-bar" style=\{\{\s*display:\s*'flex',\s*flex:\s*1/g,
  '<div className="map-search-bar relative" style={{ display: \'flex\', flex: 1'
);

// We need to move the Search Dropdown back INSIDE map-search-bar.
// It is currently AFTER map-search-bar.
// map-search-bar ends with:
//               </button>
//               </div>
//   
//               {/* Search Dropdown */}

mapPageCode = mapPageCode.replace(
  /<\/button>\s*<\/div>\s*\{\/\* Search Dropdown \*\/\}/g,
  '</button>\n            {/* Search Dropdown */}'
);

// We need to add the closing </div> back at the end of the dropdown block
//                 )}
//               </div>
//             )}
//           </div>
//   
//           {/* Filter Pills & Controls */}
// We want it to be:
//                 )}
//               </div>
//             )}
//             </div>
//           </div>
//   
//           {/* Filter Pills & Controls */}

mapPageCode = mapPageCode.replace(
  /\s*\}\)\}\s*<\/div>\s*<\/div>\s*\{\/\* Filter Pills/g,
  '\n              )}\n            </div>\n            </div>\n          </div>\n\n          {/* Filter Pills'
);


fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
console.log('Restored dropdown centering.');
