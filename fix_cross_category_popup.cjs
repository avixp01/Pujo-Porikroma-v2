const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const filterFunc = `
  const handleFilterClick = (filterType) => {
    setActiveFilter(activeFilter === filterType ? 'all' : filterType);
    setSelectedLocation(null);
  };
`;

// Insert it right after the states, for example after `const [nearbyPandals, setNearbyPandals] = useState([]);`
const targetInsert = `const [nearbyPandals, setNearbyPandals] = useState([]);`;
code = code.replace(targetInsert, targetInsert + filterFunc);

// Now replace the onClick handlers
code = code.replace(/onClick=\{\(\) => setActiveFilter\(activeFilter === 'pandal' \? 'all' : 'pandal'\)\}/g, "onClick={() => handleFilterClick('pandal')}");
code = code.replace(/onClick=\{\(\) => setActiveFilter\(activeFilter === 'toilet' \? 'all' : 'toilet'\)\}/g, "onClick={() => handleFilterClick('toilet')}");
code = code.replace(/onClick=\{\(\) => setActiveFilter\(activeFilter === 'metro' \? 'all' : 'metro'\)\}/g, "onClick={() => handleFilterClick('metro')}");
code = code.replace(/onClick=\{\(\) => setActiveFilter\(activeFilter === 'train' \? 'all' : 'train'\)\}/g, "onClick={() => handleFilterClick('train')}");

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully added handleFilterClick logic");
