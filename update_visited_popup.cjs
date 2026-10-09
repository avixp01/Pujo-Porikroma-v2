const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

// Add import if not present
if (!content.includes('import { allPujos } from')) {
    content = content.replace("import './RequestPandalPopup.css';", "import './RequestPandalPopup.css';\nimport { allPujos } from '../data/allPujos.js';");
}

const mapRegex = /\{visitedPandals\.map\(\(item, index\) => \([\s\S]*?<\/li>\s*\)\)\}/;

const newMap = `{visitedPandals.map((item, index) => {
                  const itemName = typeof item === 'object' ? item.name : item;
                  const pujoObj = allPujos.find(p => p.name === itemName || p.id === itemName);
                  const subtitle = pujoObj ? (pujoObj.address ? pujoObj.address : pujoObj.category ? \`\${pujoObj.category}\` : 'Pandal') : 'Pandal';

                  return (
                  <li key={index} style={{ backgroundColor: '#2c2522', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ backgroundColor: '#7c2d12', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>
                      {index + 1}
                    </div>
                    
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#f5e6d3', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{itemName}</span>
                      <span style={{ color: 'rgba(245, 230, 211, 0.6)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>{subtitle}</span>
                    </div>

                    {typeof item === 'object' && item.time && (
                      <span style={{ color: 'rgba(245, 230, 211, 0.6)', fontSize: '13px' }}>
                        { '{' + item.time + '}' }
                      </span>
                    )}

                    {isEditing && (
                      <button 
                        onClick={() => handleRemoveItem(index)}
                        style={{ 
                          backgroundColor: '#fef3c7', 
                          border: 'none', 
                          width: '22px', 
                          height: '22px', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          cursor: 'pointer',
                          color: '#7c2d12',
                          flexShrink: 0,
                          marginLeft: 'auto'
                        }}
                        aria-label="Remove item"
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                    )}
                  </li>
                  );
                })}`;

if (mapRegex.test(content)) {
    content = content.replace(mapRegex, newMap);
    console.log("Successfully updated VisitedPandalPopup!");
    fs.writeFileSync(file, content, 'utf8');
} else {
    console.log("Could not find the map block!");
}
