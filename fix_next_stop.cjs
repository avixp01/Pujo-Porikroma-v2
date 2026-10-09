const fs = require('fs');
const file = 'src/components/MapPage.jsx';
let content = fs.readFileSync(file, 'utf8');

const targetStr = `                    </div>
  
                    <button style={{ width: '100%', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('map')}>`;

const replacementStr = `  
                    <button style={{ width: '100%', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer', marginTop: '16px' }} onClick={() => setActiveTab('map')}>`;

const targetStr2 = `                    </button>
                  </div>
  
                  {/* FAB Overlay */}`;

const replacementStr2 = `                    </button>
                  </div>
                  </div>
  
                  {/* FAB Overlay */}`;


if (content.includes(targetStr) && content.includes(targetStr2)) {
    content = content.replace(targetStr, replacementStr);
    content = content.replace(targetStr2, replacementStr2);
    fs.writeFileSync(file, content, 'utf8');
    console.log("Successfully fixed the Next stop button!");
} else {
    console.log("Could not find the exact strings to replace.");
}
