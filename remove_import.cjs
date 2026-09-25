const fs = require('fs');

let code = fs.readFileSync('src/components/PujoThemeCards.jsx', 'utf8');

code = code.replace(/import \{ ArrowRight \} from 'lucide-react';\n?/, '');

fs.writeFileSync('src/components/PujoThemeCards.jsx', code, 'utf8');
console.log("Removed ArrowRight import");
