const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `</svg> Route
            </button>
          </div>
        </div>
      </div>`;

const replacement = `</svg> Route
            </button>
            )}
          </div>
        </div>
      </div>`;

code = code.replace(target, replacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully closed the route button conditional");
