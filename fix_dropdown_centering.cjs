const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Remove relative from map-search-container
mapPageCode = mapPageCode.replace(
  '<div className="map-search-container relative">',
  '<div className="map-search-container">'
);

// Add relative to map-search-bar
mapPageCode = mapPageCode.replace(
  '<div className="map-search-bar" style={{ display: \'flex\', flex: 1',
  '<div className="map-search-bar relative" style={{ display: \'flex\', flex: 1'
);

// Move the Search Dropdown inside map-search-bar
// We find the end of map-search-bar which is the closing div after the button
const searchDropdownTarget = `              </button>
            </div>
            
            {/* Search Dropdown */}
            {isSearchFocused && (`;

const searchDropdownReplacement = `              </button>
            
              {/* Search Dropdown */}
              {isSearchFocused && (`;

mapPageCode = mapPageCode.replace(searchDropdownTarget, searchDropdownReplacement);

// Now we need to add the closing div of map-search-bar AFTER the dropdown
// We can find the end of the dropdown and add the closing div there.
// The dropdown ends with:
//                    )
//                  ) : (
//                    // BEST MATCHES LIST
//                    ...
//                  )}
//                </div>
//              )}
//            </div>
//
//            {/* Filter Pills & Controls */}

const endOfDropdownTarget = `                  </>
                )}
              </div>
            )}
          </div>
  
          {/* Filter Pills & Controls */}`;

const endOfDropdownReplacement = `                  </>
                )}
              </div>
            )}
            </div>
          </div>
  
          {/* Filter Pills & Controls */}`;

mapPageCode = mapPageCode.replace(endOfDropdownTarget, endOfDropdownReplacement);

fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
console.log('Fixed dropdown centering.');
