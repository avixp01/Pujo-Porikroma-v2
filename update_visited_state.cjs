const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetState = `const [visitedPandals, setVisitedPandals] = useState([]);`;
const replaceState = `const [visitedPandals, setVisitedPandals] = useState(() => {
    try {
      const stored = localStorage.getItem('visitedPandals');
      return stored ? JSON.parse(stored) : [];
    } catch(e) {
      return [];
    }
  });`;

if (content.includes(targetState)) {
    content = content.replace(targetState, replaceState);
    console.log("State initialization updated");
}

const targetSpan = `setVisitedPandals(prev => [...prev, selectedLocation.id]);`;
const replaceSpan = `setVisitedPandals(prev => {
                        const next = [...prev, selectedLocation.name || selectedLocation.id];
                        localStorage.setItem('visitedPandals', JSON.stringify(next));
                        window.dispatchEvent(new Event('visitedPandalsUpdated'));
                        return next;
                      });`;

if (content.includes(targetSpan)) {
    content = content.replace(targetSpan, replaceSpan);
    console.log("State update with localStorage added");
}

const targetSelectedCheck = `const isVisited = selectedLocation && visitedPandals.includes(selectedLocation.id);`;
const replaceSelectedCheck = `const isVisited = selectedLocation && (visitedPandals.includes(selectedLocation.id) || visitedPandals.includes(selectedLocation.name));`;

if (content.includes(targetSelectedCheck)) {
    content = content.replace(targetSelectedCheck, replaceSelectedCheck);
    console.log("State check updated");
}

fs.writeFileSync(file, content, 'utf8');
