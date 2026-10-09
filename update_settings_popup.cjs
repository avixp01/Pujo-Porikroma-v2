const fs = require('fs');
const file = 'src/components/SettingsPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
if (!content.includes("import VisitedPandalPopup from './VisitedPandalPopup';")) {
  content = content.replace("import RequestPandalPopup from './RequestPandalPopup';", "import RequestPandalPopup from './RequestPandalPopup';\nimport VisitedPandalPopup from './VisitedPandalPopup';");
}

// 2. Add state
if (!content.includes("const [showVisited, setShowVisited] = useState(false);")) {
  content = content.replace("const [showRequestPandal, setShowRequestPandal] = useState(false);", "const [showRequestPandal, setShowRequestPandal] = useState(false);\n  const [showVisited, setShowVisited] = useState(false);\n  const [visitedCount, setVisitedCount] = useState(0);");
}

// 3. Add useEffect to read visitedCount
if (!content.includes("setVisitedCount(JSON.parse(stored).length);")) {
  const useEffectToAdd = `
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem('visitedPandals');
        if (stored) {
          setVisitedCount(JSON.parse(stored).length);
        }
      } catch(e) {}
    };
    updateCount();
    window.addEventListener('visitedPandalsUpdated', updateCount);
    return () => window.removeEventListener('visitedPandalsUpdated', updateCount);
  }, []);
`;
  content = content.replace("const handlePopState = (e) => {", useEffectToAdd + "\n    const handlePopState = (e) => {");
}

// 4. Update the "0" to "{visitedCount}"
const targetNumber = `<span className="settings-stat-number">0</span>`;
const replaceNumber = `<span className="settings-stat-number">{visitedCount}</span>`;
if (content.includes(targetNumber)) {
  content = content.replace(targetNumber, replaceNumber);
}

// 5. Update the "view" click handler
const targetViewCard = `<div className="settings-journey-card" style={{ flex: 'none', justifyContent: 'flex-end', cursor: 'pointer', marginRight: '8px' }}>`;
const replaceViewCard = `<div className="settings-journey-card" onClick={() => openPopup(setShowVisited)} style={{ flex: 'none', justifyContent: 'flex-end', cursor: 'pointer', marginRight: '8px' }}>`;
if (content.includes(targetViewCard)) {
  content = content.replace(targetViewCard, replaceViewCard);
}

// 6. Render the VisitedPandalPopup
const renderTarget = `{showRequestPandal && (`;
const renderReplace = `{showVisited && (
          <VisitedPandalPopup 
            onClose={() => closePopup(setShowVisited)} 
          />
        )}
        
        {showRequestPandal && (`;
if (content.includes(renderTarget) && !content.includes("<VisitedPandalPopup")) {
  content = content.replace(renderTarget, renderReplace);
}

fs.writeFileSync(file, content, 'utf8');
console.log("SettingsPopup updated successfully!");
