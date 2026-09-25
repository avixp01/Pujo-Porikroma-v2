const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `            </div>
          )}
          </div>
        </div>

        {/* Filter Pills & Controls */}`;

const replacement = `            </div>
          )}
          </div>

        {/* Filter Pills & Controls */}`;

code = code.replace(target, replacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Removed extra div.');
