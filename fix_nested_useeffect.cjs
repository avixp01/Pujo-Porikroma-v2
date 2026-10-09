const fs = require('fs');
const file = 'src/components/SettingsPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

// I will just read the file, identify the nested useEffect, and fix it.
const regex = /useEffect\(\(\) => \{\s*useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);\s*const handlePopState =/g;

if (regex.test(content)) {
    console.log("Found the nested useEffect, fixing it now...");
    const replacement = `
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

  useEffect(() => {
    const handlePopState =`;
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully fixed the nested useEffect crash!");
} else {
    console.log("Could not find the nested useEffect using regex");
}
