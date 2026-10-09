const fs = require("fs");
const file = "src/components/MapPage.jsx";
let content = fs.readFileSync(file, "utf8");

const targetState = /const \[rainStatus, setRainStatus\] = useState\('no_rain'\);/;
const stateReplacement = `const [rainStatus, setRainStatus] = useState('no_rain');
  const [visitedPandals, setVisitedPandals] = useState([]);

  React.useEffect(() => {
    const loadVisited = () => {
      try {
        const stored = localStorage.getItem('visitedPandals');
        if (stored) setVisitedPandals(JSON.parse(stored));
      } catch(e) {}
    };
    loadVisited();
    window.addEventListener('visitedPandalsUpdated', loadVisited);
    return () => window.removeEventListener('visitedPandalsUpdated', loadVisited);
  }, []);

  const handleMarkVisited = () => {
    if (!selectedLocation || !selectedLocation.name) return;
    try {
      const stored = localStorage.getItem('visitedPandals');
      let list = stored ? JSON.parse(stored) : [];
      
      const alreadyVisited = list.some(item => {
        if (typeof item === 'string') return item === selectedLocation.name;
        return item.name === selectedLocation.name;
      });
      
      if (!alreadyVisited) {
        const timeStr = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
        list.push({ name: selectedLocation.name, time: timeStr });
        localStorage.setItem('visitedPandals', JSON.stringify(list));
        setVisitedPandals(list);
        window.dispatchEvent(new Event('visitedPandalsUpdated'));
      }
    } catch(e) {}
  };
`;

content = content.replace(targetState, stateReplacement);

const targetButton = /<button onClick=\{\(\) => setShowUpdatePopup\(true\)\} style=\{\{ background: 'none', border: 'none', color: '#16a34a', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', paddingRight: '16px' \}\}>\s*Visited\s*<\/button>/;

const buttonReplacement = `{(() => {
                    const isVisited = visitedPandals.some(item => {
                      if (typeof item === 'string') return item === (selectedLocation?.name);
                      return item.name === (selectedLocation?.name);
                    });
                    return (
                      <button onClick={handleMarkVisited} style={{ background: 'none', border: 'none', color: isVisited ? '#d2b48c' : '#d97706', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', paddingRight: '16px' }}>
                        {isVisited ? 'Visited \u2713' : 'Visited?'}
                      </button>
                    );
                  })()}`;

if (targetButton.test(content)) {
    content = content.replace(targetButton, buttonReplacement);
    
    // Also change the marginBottom: "0px" to "8px" for the metro-info
    const targetMetroInfo = /<div className="preview-metro-info" style=\{\{ marginBottom: "0px" \}\}>/;
    const metroInfoReplacement = `<div className="preview-metro-info" style={{ marginBottom: "8px" }}>`;
    content = content.replace(targetMetroInfo, metroInfoReplacement);
    
    fs.writeFileSync(file, content);
    console.log("Successfully injected Visited logic!");
} else {
    console.log("Could not find the target string.");
}

