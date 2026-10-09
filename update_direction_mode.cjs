const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// Replace default state
code = code.replace(
    /const \[activeDirectionMode, setActiveDirectionMode\] = useState\('footprints'\);/g,
    `const [activeDirectionMode, setActiveDirectionMode] = useState('car');`
);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log('Successfully updated default activeDirectionMode to car!');
