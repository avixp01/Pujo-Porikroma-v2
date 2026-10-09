const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

// Find all occurrences of the handleClearAll function
const funcStr = `  const handleClearAll = () => {
    localStorage.setItem('visitedPandals', JSON.stringify([]));
    setVisitedPandals([]);
    window.dispatchEvent(new Event('visitedPandalsUpdated'));
  };`;

// Replace all occurrences with empty string, then add one back
if (content.includes("const handleClearAll")) {
    const firstIdx = content.indexOf("const handleClearAll");
    const lastIdx = content.lastIndexOf("const handleClearAll");
    
    if (firstIdx !== lastIdx) {
        console.log("Duplicate found! Fixing...");
        // Let's just do a string replace on the exact text
        const duplicateStr = `  const handleClearAll = () => {
    localStorage.setItem('visitedPandals', JSON.stringify([]));
    setVisitedPandals([]);
    window.dispatchEvent(new Event('visitedPandalsUpdated'));
  };

  const handleClearAll = () => {
    localStorage.setItem('visitedPandals', JSON.stringify([]));
    setVisitedPandals([]);
    window.dispatchEvent(new Event('visitedPandalsUpdated'));
  };`;
        if (content.includes(duplicateStr)) {
            content = content.replace(duplicateStr, funcStr);
            fs.writeFileSync(file, content, 'utf8');
            console.log("Fixed!");
        } else {
            console.log("String mismatch, trying generic replace...");
            // Remove the second one manually
            const lines = content.split('\\n');
            let foundCount = 0;
            let newLines = [];
            let inDuplicate = false;
            
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes("const handleClearAll = () => {")) {
                    foundCount++;
                    if (foundCount > 1) {
                        inDuplicate = true;
                        continue; // Skip this line
                    }
                }
                
                if (inDuplicate) {
                    if (lines[i].includes("};")) {
                        inDuplicate = false; // End of duplicate block
                    }
                    continue; // Skip lines inside duplicate
                }
                
                newLines.push(lines[i]);
            }
            fs.writeFileSync(file, newLines.join('\\n'), 'utf8');
            console.log("Fixed via lines!");
        }
    } else {
        console.log("No duplicate found.");
    }
}
