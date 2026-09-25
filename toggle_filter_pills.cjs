const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetBlock = `{/* Filter Pills & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}>`;

const replaceBlock = `{/* Filter Pills & Controls */}
        {!isSearchFocused && (
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: '16px' }}>`;

// Find where the block ends.
// It ends exactly before `{/* Map Area */}`
// The structure is:
//             </div>
//             
//             
//           </div>
//         </div>
//   
//         {/* Map Area */}

const targetEnd = `            
            
          </div>
        </div>

        {/* Map Area */}`;

const replaceEnd = `            
            
          </div>
        )}
        </div>

        {/* Map Area */}`;

code = code.replace(targetBlock, replaceBlock);
code = code.replace(targetEnd, replaceEnd);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Wrapped Filter Pills with !isSearchFocused condition.');
