const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add state and effect
const stateRegex = /const \[selectedLocation, setSelectedLocation\] = useState\(null\);/;
if (content.includes('const [selectedLocation, setSelectedLocation] = useState(null);')) {
    const newState = `const [selectedLocation, setSelectedLocation] = useState(null);
  
  const [visitedPandals, setVisitedPandals] = useState([]);
  useEffect(() => {
    const loadVisited = () => {
      try {
        const stored = localStorage.getItem('visitedPandals');
        if (stored) setVisitedPandals(JSON.parse(stored));
      } catch (e) {}
    };
    loadVisited();
    window.addEventListener('visitedPandalsUpdated', loadVisited);
    return () => window.removeEventListener('visitedPandalsUpdated', loadVisited);
  }, []);

  const isVisited = (name) => {
    return visitedPandals.some(p => (typeof p === 'object' ? p.name === name : p === name));
  };

  const toggleVisited = (e, name) => {
    e.stopPropagation();
    let next;
    if (isVisited(name)) {
      next = visitedPandals.filter(p => (typeof p === 'object' ? p.name !== name : p !== name));
    } else {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      next = [...visitedPandals, { name, time: timeStr }];
    }
    setVisitedPandals(next);
    localStorage.setItem('visitedPandals', JSON.stringify(next));
    window.dispatchEvent(new Event('visitedPandalsUpdated'));
  };`;
    content = content.replace(stateRegex, newState);
}

// 2. Add button
const metroRegex = /<div className="preview-metro-info">[\s\S]*?<svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">[\s\S]*?<path d="M12 2C8 2 4 5 4 9v7c0 1\.1\.9 2 2 2h12c1\.1 0 2-\.9 2-2V9c0-4-4-7-8-7zm0 2c3\.3 0 6 2\.2 6 5H6c0-2\.8 2\.7-5 6-5zm-3 8a1\.5 1\.5 0 110-3 1\.5 1\.5 0 010 3zm6 0a1\.5 1\.5 0 110-3 1\.5 1\.5 0 010 3z" \/>[\s\S]*?<path d="M6 19v3h2v-3H6zm10 0v3h2v-3h-2z" \/>[\s\S]*?<\/svg>[\s\S]*?<span className="metro-name">Jatin Das Park<\/span> • exit <span className="metro-gate">Gate 3<\/span> • 2\.4 km walk[\s\S]*?<\/div>/;

const newMetro = `<div className="preview-metro-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">
                <path d="M12 2C8 2 4 5 4 9v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-4-4-7-8-7zm0 2c3.3 0 6 2.2 6 5H6c0-2.8 2.7-5 6-5zm-3 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                <path d="M6 19v3h2v-3H6zm10 0v3h2v-3h-2z" />
              </svg>
              <span><span className="metro-name">Jatin Das Park</span> • exit <span className="metro-gate">Gate 3</span> • 2.4 km walk</span>
            </div>
            
            <button 
              onClick={(e) => toggleVisited(e, selectedLocation?.name)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: isVisited(selectedLocation?.name) ? '#7c2d12' : '#d2b48c',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer',
                padding: '4px 8px',
                marginLeft: '8px'
              }}
            >
              {isVisited(selectedLocation?.name) ? 'Visited' : 'Visited?'}
            </button>
          </div>`;

if (metroRegex.test(content)) {
    content = content.replace(metroRegex, newMetro);
    console.log("Successfully added visited toggle!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find preview-metro-info!");
}
