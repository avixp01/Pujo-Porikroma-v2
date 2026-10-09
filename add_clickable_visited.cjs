const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add state
const targetState = `const [plannedStops, setPlannedStops] = useState([]);`;
const replaceState = `const [plannedStops, setPlannedStops] = useState([]);\n  const [visitedPandals, setVisitedPandals] = useState([]);`;

if (content.includes(targetState)) {
    content = content.replace(targetState, replaceState);
} else {
    console.log("Could not find state target");
}

// 2. Replace the span
const targetSpan = `<span style={{ color: '#b45309', fontWeight: 'bold', fontSize: '13px' }}>Visited?</span>`;
const replaceSpan = `{(() => {
              const isVisited = selectedLocation && visitedPandals.includes(selectedLocation.id);
              return (
                <span 
                  style={{ 
                    color: isVisited ? '#7c2d12' : '#b45309', 
                    fontWeight: 'bold', 
                    fontSize: '13px',
                    cursor: isVisited ? 'default' : 'pointer',
                    userSelect: 'none'
                  }}
                  onClick={() => {
                    if (selectedLocation && !isVisited) {
                      setVisitedPandals(prev => [...prev, selectedLocation.id]);
                    }
                  }}
                >
                  {isVisited ? 'Visited' : 'Visited?'}
                </span>
              );
            })()}`;

if (content.includes(targetSpan)) {
    content = content.replace(targetSpan, replaceSpan);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully added clickable Visited state!");
} else {
    console.log("Could not find span target");
}
