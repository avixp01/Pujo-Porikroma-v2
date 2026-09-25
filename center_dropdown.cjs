const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Make map-search-container relative
code = code.replace(
  '<div className="map-search-container">',
  '<div className="map-search-container relative">'
);

// 2. Remove relative from map-search-bar
code = code.replace(
  '<div className="map-search-bar relative" style={{ display: \'flex\', flex: 1,',
  '<div className="map-search-bar" style={{ display: \'flex\', flex: 1,'
);

// 3. Move the Search Dropdown OUT of map-search-bar
// Currently it's before the closing </div> of map-search-bar.
// Let's find: `</button>\n              {/* Search Dropdown */}`
// and change to: `</button>\n            </div>\n\n            {/* Search Dropdown */}`
code = code.replace(
  /<\/button>\s*\{\/\* Search Dropdown \*\/\}/g,
  '</button>\n            </div>\n\n            {/* Search Dropdown */}'
);

// 4. Update the styling of the Search Dropdown to center it perfectly
code = code.replace(
  /left:\s*'-20px',\s*right:\s*'-20px',/g,
  "left: '50%',\n                  transform: 'translateX(-50%)',\n                  width: 'calc(100% - 16px)',"
);

// 5. Remove the extra </div> that we just orphaned at the end of the isSearchFocused block
// Current bottom:
//                 )}
//               </div>
//             )}
//             </div>
//           </div>
//   
//           {/* Filter Pills & Controls */}
// Change to:
//                 )}
//               </div>
//             )}
//           </div>
//   
//           {/* Filter Pills & Controls */}
const targetBottom = `                )}
              </div>
            )}
            </div>
          </div>
  
          {/* Filter Pills & Controls */}`;

const replaceBottom = `                )}
              </div>
            )}
          </div>
  
          {/* Filter Pills & Controls */}`;

if (code.includes(targetBottom)) {
  code = code.replace(targetBottom, replaceBottom);
} else {
  // Try CRLF
  if (code.includes(targetBottom.replace(/\n/g, '\r\n'))) {
    code = code.replace(targetBottom.replace(/\n/g, '\r\n'), replaceBottom.replace(/\n/g, '\r\n'));
  }
}

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Centered dropdown in screen.');
