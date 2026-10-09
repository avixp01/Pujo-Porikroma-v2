const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Add state
const stateRegex = /const \[selectedLocation, setSelectedLocation\] = useState\(null\);/;
const stateReplacement = `const [selectedLocation, setSelectedLocation] = useState(null);
  const [visitedPandals, setVisitedPandals] = useState(() => {
    try {
      const saved = localStorage.getItem('visitedPandals');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem('visitedPandals', JSON.stringify(visitedPandals));
  }, [visitedPandals]);

  const toggleVisited = (id) => {
    setVisitedPandals(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };`;

if (content.includes('const [selectedLocation, setSelectedLocation] = useState(null);')) {
    content = content.replace(stateRegex, stateReplacement);
}

const buttonRegex = /<div className="preview-metro-info">[\s\S]*?<span className="metro-name">Jatin Das Park<\/span>[\s\S]*?2\.4 km walk\s*<\/div>/;

const buttonReplacement = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div className="preview-metro-info" style={{ margin: 0 }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#2563eb">
                  <path d="M12 2C8 2 4 5 4 9v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-4-4-7-8-7zm0 2c3.3 0 6 2.2 6 5H6c0-2.8 2.7-5 6-5zm-3 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                  <path d="M6 19v3h2v-3H6zm10 0v3h2v-3h-2z" />
                </svg>
                <span className="metro-name">Jatin Das Park</span> - exit <span className="metro-gate">Gate 3</span> - 2.4 km walk
              </div>
              {selectedLocation && (
              <button 
                onClick={(e) => { e.stopPropagation(); toggleVisited(selectedLocation.id); }}
                style={{
                  background: visitedPandals.includes(selectedLocation.id) ? '#7c2d12' : '#f5deb3',
                  color: visitedPandals.includes(selectedLocation.id) ? '#ffffff' : '#7c2d12',
                  border: 'none',
                  borderRadius: '16px',
                  padding: '4px 14px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                {visitedPandals.includes(selectedLocation.id) ? 'Visited' : 'Visited?'}
              </button>
              )}
            </div>`;

if (buttonRegex.test(content)) {
    content = content.replace(buttonRegex, buttonReplacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Replaced metro info with visited toggle!");
} else {
    console.log("Could not find the metro info block.");
}
