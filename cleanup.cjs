const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `        )}
  
        
          </button>
        </div>
  
        {/* Nearby Overlay & Bottom Sheet */}`;

const replacement = `        )}
  
        {/* Nearby Overlay & Bottom Sheet */}`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Success cleanup");
} else {
    console.log("Target not found. Looking at substring...");
}
