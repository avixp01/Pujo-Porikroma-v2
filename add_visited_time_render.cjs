const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\{visitedPandals\.map\(\(name, index\) => \([\s\S]*?<span style=\{\{ color: '#f5e6d3', fontSize: '14px', fontWeight: '500', flex: 1 \}\}>\{name\}<\/span>/;

const replacement = `{visitedPandals.map((item, index) => (
                <li key={index} style={{ backgroundColor: '#2c2522', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '12px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ backgroundColor: '#7c2d12', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', flexShrink: 0 }}>
                    {index + 1}
                  </div>
                  <span style={{ color: '#f5e6d3', fontSize: '14px', fontWeight: '500', flex: 1 }}>{typeof item === 'object' ? item.name : item}</span>
                  {typeof item === 'object' && item.time && (
                    <span style={{ color: 'rgba(245, 230, 211, 0.6)', fontSize: '13px' }}>
                      { '{' + item.time + '}' }
                    </span>
                  )}`;
                  
if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully added time to VisitedPandalPopup");
} else {
    console.log("Could not find list item regex.");
}
