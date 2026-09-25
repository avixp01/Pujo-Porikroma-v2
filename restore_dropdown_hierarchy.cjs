const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Remove `relative` from map-search-container
code = code.replace(
  '<div className="map-search-container relative">',
  '<div className="map-search-container">'
);

// 2. Add `relative` back to map-search-bar
code = code.replace(
  '<div className="map-search-bar" style={{ display: \'flex\', flex: 1,',
  '<div className="map-search-bar relative" style={{ display: \'flex\', flex: 1,'
);

// 3. Move the Search Dropdown BACK inside map-search-bar
// Currently it is AFTER map-search-bar.
// Current structure:
//            </button>
//            </div>
//
//            {/* Search Dropdown */}
//            {isSearchFocused && (
const targetStructure = `            </button>
            </div>

            {/* Search Dropdown */}
          {isSearchFocused && (`;

const replaceStructure = `            </button>

            {/* Search Dropdown */}
          {isSearchFocused && (`;

code = code.replace(targetStructure, replaceStructure);

// We need to add the closing </div> of map-search-bar AFTER the dropdown!
// Where does the dropdown end?
//                 )}
//               </div>
//             )}
//           </div>
//
//        {/* Filter Pills & Controls */}
// We need to change the last `</div>` to `</div></div>`.
// Let's just find the end of the isSearchFocused block.
const targetEnd = `                  )}
                </>
              )}
            </div>
          )}
          </div>

        {/* Filter Pills & Controls */}`;

const replaceEnd = `                  )}
                </>
              )}
            </div>
          )}
            </div>
          </div>

        {/* Filter Pills & Controls */}`;

code = code.replace(targetEnd, replaceEnd);

// 4. Update the styles to use fixed offset `left: -62px` instead of `left: 50%`
const targetStyle = `                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'calc(100vw - 12px)',`;

const replaceStyle = `                  left: '-62px',
                  width: 'calc(100vw - 12px)',`;

code = code.replace(targetStyle, replaceStyle);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Restored dropdown to map-search-bar and applied precise left offset.');
