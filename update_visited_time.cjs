const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update the isVisited check
const targetIsVisited = `const isVisited = selectedLocation && (visitedPandals.includes(selectedLocation.id) || visitedPandals.includes(selectedLocation.name));`;
const replaceIsVisited = `const isVisited = selectedLocation && visitedPandals.some(item => {
                const name = typeof item === 'object' ? item.name : item;
                return name === selectedLocation.id || name === selectedLocation.name;
              });`;

if (content.includes(targetIsVisited)) {
    content = content.replace(targetIsVisited, replaceIsVisited);
    console.log("Replaced isVisited check");
} else {
    console.log("Could not find isVisited check");
}

// 2. Update the toggle logic
const targetToggle = `if (isVisited) {
                              next = prev.filter(item => item !== nameOrId);
                            } else {
                              next = [...prev, nameOrId];
                            }`;
                            
const replaceToggle = `if (isVisited) {
                              next = prev.filter(item => {
                                const itemName = typeof item === 'object' ? item.name : item;
                                return itemName !== nameOrId;
                              });
                            } else {
                              const now = new Date();
                              const timeString = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true });
                              next = [...prev, { name: nameOrId, time: timeString }];
                            }`;

if (content.includes(targetToggle)) {
    content = content.replace(targetToggle, replaceToggle);
    console.log("Replaced toggle logic");
} else {
    console.log("Could not find toggle logic");
}

fs.writeFileSync(file, content, 'utf8');
