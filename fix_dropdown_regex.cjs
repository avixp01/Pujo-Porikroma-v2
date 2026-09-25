const fs = require('fs');
let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// The goal is to move the closing </div> of map-search-bar to AFTER the dropdown.
// Currently it looks like:
//              </button>
//            </div>
//            
//            {/* Search Dropdown */}

mapPageCode = mapPageCode.replace(
  /<\/button>\s*<\/div>\s*\{\/\* Search Dropdown \*\/\}/g,
  '</button>\n            {/* Search Dropdown */}'
);

// Now we need to append the closing </div> of map-search-bar after the dropdown block finishes
// It currently ends like this:
//                  </>
//                )}
//              </div>
//            )}
//          </div>
//  
//          {/* Filter Pills & Controls */}

mapPageCode = mapPageCode.replace(
  /<\/div>\s*\}\)\}\s*<\/div>\s*\{\/\* Filter Pills & Controls \*\/\}/g,
  '</div>\n            )}\n            </div>\n          </div>\n\n          {/* Filter Pills & Controls */}'
);

fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
console.log('Fixed dropdown centering with regex.');
