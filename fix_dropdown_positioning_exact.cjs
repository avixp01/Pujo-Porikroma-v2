const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. We previously removed `relative` from `map-search-container` and added it to `map-search-bar`.
// Let's reverse that.
code = code.replace(
  '<div className="map-search-container">',
  '<div className="map-search-container relative">'
);

code = code.replace(
  '<div className="map-search-bar relative"',
  '<div className="map-search-bar"'
);

// 2. We need to move the dropdown from inside map-search-bar to inside map-search-container.
// Currently it is INSIDE map-search-bar.
// We find the closing div of map-search-bar and swap it with the `{isSearchFocused && (`
const targetSwap = `            </button>

            {/* Search Dropdown */}
          {isSearchFocused && (`;

const replaceSwap = `            </button>
            </div>

            {/* Search Dropdown */}
          {isSearchFocused && (`;

code = code.replace(targetSwap, replaceSwap);

const targetEndSwap = `                  )}
                </>
              )}
            </div>
          )}
            </div>
          </div>

        {/* Filter Pills & Controls */}`;

const replaceEndSwap = `                  )}
                </>
              )}
            </div>
          )}
          </div>

        {/* Filter Pills & Controls */}`;

code = code.replace(targetEndSwap, replaceEndSwap);

// 3. Update style block
const targetStyle = `                  left: '-58px',
                  width: 'calc(100vw - 20px)',`;

const replaceStyle = `                  left: '-6px',
                  right: '-6px',
                  width: 'auto',`;

code = code.replace(targetStyle, replaceStyle);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Fixed dropdown positioning with precise style replace.');
