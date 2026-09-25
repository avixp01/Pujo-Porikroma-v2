const fs = require('fs');
let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const targetStr = `                )}
              </div>
            )}
          </div>
  
          {/* Filter Pills & Controls */}`;

const replacementStr = `                )}
              </div>
            )}
            </div>
          </div>
  
          {/* Filter Pills & Controls */}`;

if (mapPageCode.includes(targetStr)) {
  mapPageCode = mapPageCode.replace(targetStr, replacementStr);
  fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
  console.log('Successfully fixed missing closing div.');
} else {
  console.log('Target string not found!');
}
