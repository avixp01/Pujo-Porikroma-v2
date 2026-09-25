const fs = require('fs');

let mapPageCode = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

if (!mapPageCode.includes("const [homeAddress, setHomeAddress] = useState")) {
  mapPageCode = mapPageCode.replace(
    /const \[userLocation, setUserLocation\] = useState\(null\);/,
    `const [userLocation, setUserLocation] = useState(null);\n  const [homeAddress, setHomeAddress] = useState('...');\n  const lastFetchedLocationRef = React.useRef(null);`
  );
  fs.writeFileSync('src/components/MapPage.jsx', mapPageCode, 'utf8');
  console.log("Added homeAddress state.");
} else {
  console.log("State already exists.");
}
