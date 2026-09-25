const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const target = `  const handleFilterClick = (filterType) => {
    setActiveFilters(prev => {
      if (prev.includes(filterType)) {
        return prev.filter(f => f !== filterType);
      } else {
        return [...prev, filterType];
      }
    });
    setSelectedLocation(null);
  };`;

const replacement = `  const handleFilterClick = (filterType) => {
    setActiveFilters(prev => {
      if (prev.includes(filterType)) {
        if (prev.length === 1) return prev; // Prevent deselecting the last active filter
        return prev.filter(f => f !== filterType);
      } else {
        return [...prev, filterType];
      }
    });
    setSelectedLocation(null);
  };`;

code = code.replace(target, replacement);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully prevented deselecting the last active filter");
