const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetToggle = `if (isVisited) {
                            next = prev.filter(item => item !== nameOrId);
                          } else {
                            next = [...prev, nameOrId];
                          }`;
                          
// I'll use a regex replacing the entire block inside setVisitedPandals to be safe
const regex = /let next;\s*if\s*\(isVisited\)\s*\{\s*next = prev\.filter\(item => item !== nameOrId\);\s*\}\s*else\s*\{\s*next = \[\.\.\.prev, nameOrId\];\s*\}/;

const replaceToggle = `let next;
                            if (isVisited) {
                              next = prev.filter(item => {
                                const itemName = typeof item === 'object' ? item.name : item;
                                return itemName !== nameOrId;
                              });
                            } else {
                              const now = new Date();
                              const timeString = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true });
                              next = [...prev, { name: nameOrId, time: timeString }];
                            }`;

if (regex.test(content)) {
    content = content.replace(regex, replaceToggle);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully replaced toggle logic.");
} else {
    console.log("Could not find toggle logic using regex.");
}
