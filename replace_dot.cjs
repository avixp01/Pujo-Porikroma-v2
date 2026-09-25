const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Add MapPin to lucide imports
code = code.replace(/ArrowUpDown \} from 'lucide-react';/, "ArrowUpDown, MapPin } from 'lucide-react';");

// 2. Replace dot-end with MapPin
const dotEndRegex = /<div className="dot-end" \/>/;
const mapPinCode = `<MapPin size={16} color="#ea4335" style={{ marginTop: '4px' }} />`;

if (code.includes('<div className="dot-end" />')) {
    code = code.replace(dotEndRegex, mapPinCode);
    fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
    console.log("Replaced dot-end with MapPin");
} else {
    console.log("Could not find dot-end div");
}
