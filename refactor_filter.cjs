const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Change state definition
code = code.replace(
  `const [activeFilter, setActiveFilter] = useState('all'); // all, pandal, metro, toilet`,
  `const [activeFilters, setActiveFilters] = useState(['pandal', 'toilet', 'metro', 'train']); // multi-select filter`
);

// 2. Change handleFilterClick
const oldHandleFilterClick = `  const handleFilterClick = (filterType) => {
    setActiveFilter(activeFilter === filterType ? 'all' : filterType);
    setSelectedLocation(null);
  };`;
const newHandleFilterClick = `  const handleFilterClick = (filterType) => {
    setActiveFilters(prev => {
      if (prev.includes(filterType)) {
        return prev.filter(f => f !== filterType);
      } else {
        return [...prev, filterType];
      }
    });
    setSelectedLocation(null);
  };`;
code = code.replace(oldHandleFilterClick, newHandleFilterClick);

// 3. Change filteredData logic
code = code.replace(
  `const filteredData = locationData.filter(loc => activeFilter === 'all' || loc.type === activeFilter);`,
  `const filteredData = locationData.filter(loc => activeFilters.includes(loc.type));`
);

// 4. Change classNames
code = code.replace(/activeFilter === 'pandal'/g, "activeFilters.includes('pandal')");
code = code.replace(/activeFilter === 'toilet'/g, "activeFilters.includes('toilet')");
code = code.replace(/activeFilter === 'metro'/g, "activeFilters.includes('metro')");
code = code.replace(/activeFilter === 'train'/g, "activeFilters.includes('train')");

// 5. Change cluster color logic
const oldClusterColor = `                let bgColor = '#c8963e';
                if (activeFilter === 'toilet') bgColor = '#2980b9';
                if (activeFilter === 'metro') bgColor = '#16a085';
                if (activeFilter === 'train') bgColor = '#8e44ad';`;
const newClusterColor = `                let bgColor = '#c8963e';
                if (activeFilters.length === 1) {
                  if (activeFilters[0] === 'toilet') bgColor = '#2980b9';
                  if (activeFilters[0] === 'metro') bgColor = '#16a085';
                  if (activeFilters[0] === 'train') bgColor = '#8e44ad';
                }`;
code = code.replace(oldClusterColor, newClusterColor);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully refactored filter to multi-select");
