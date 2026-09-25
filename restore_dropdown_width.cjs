const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// The dropdown is currently inside map-search-bar relative
// Let's move relative back to map-search-container
mapPageCode = mapPageCode.replace(
  '<div className="map-search-container">',
  '<div className="map-search-container relative">'
);

mapPageCode = mapPageCode.replace(
  /<div className="map-search-bar relative" style=\{\{\s*display:\s*'flex',\s*flex:\s*1/g,
  '<div className="map-search-bar" style={{ display: \'flex\', flex: 1'
);

// We need to move the Search Dropdown OUT of map-search-bar.
// It is currently inside map-search-bar, which ends with `</button>\n            {/* Search Dropdown */}`
// Oh wait, my fix_dropdown_regex.cjs actually did:
// mapPageCode = mapPageCode.replace(
//   /<\/button>\s*<\/div>\s*\{\/\* Search Dropdown \*\/\}/g,
//   '</button>\n            {/* Search Dropdown */}'
// );
// Let's reverse that: put the </div> BEFORE {/* Search Dropdown */}

mapPageCode = mapPageCode.replace(
  /<\/button>\s*\{\/\* Search Dropdown \*\/\}/g,
  '</button>\n            </div>\n\n            {/* Search Dropdown */}'
);

// Now we need to remove the extra </div> at the end of the dropdown block that we added
// Currently it is:
//                 )}
//               </div>
//             )}
//             </div>
//           </div>
//   
//           {/* Filter Pills & Controls */}
// We want it to be:
//                 )}
//               </div>
//             )}
//           </div>
//   
//           {/* Filter Pills & Controls */}

mapPageCode = mapPageCode.replace(
  /\s*\}\)\}\s*<\/div>\s*<\/div>\s*\{\/\* Filter Pills/g,
  '\n              )}\n            </div>\n          )}\n        </div>\n\n        {/* Filter Pills'
);

// Wait, the actual end of the block in my file right now is:
//                 )}
//               </div>
//             )}
//             </div>
//           </div>
//   
//           {/* Filter Pills & Controls */}

fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
console.log('Restored dropdown to map-search-container.');
