const fs = require('fs');
const file = 'src/components/VisitedPandalPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update imports
content = content.replace("import { X } from 'lucide-react';", "import { X, Edit } from 'lucide-react';");

// 2. Add handleClearAll
const targetUseEffectEnd = `  }, []);`;
const clearAllLogic = `  }, []);

  const handleClearAll = () => {
    localStorage.setItem('visitedPandals', JSON.stringify([]));
    setVisitedPandals([]);
    window.dispatchEvent(new Event('visitedPandalsUpdated'));
  };`;
content = content.replace(targetUseEffectEnd, clearAllLogic);

// 3. Update the subtitle block
const targetSubtitle = `<p className="req-pandal-subtitle">Your completed pujo journey</p>`;
const replaceSubtitle = `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className="req-pandal-subtitle">Your completed pujo journey</p>
            {visitedPandals.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span onClick={handleClearAll} style={{ color: '#60a5fa', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>Clear all</span>
                <span style={{ color: '#b45309', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  Edit stops <Edit size={12} strokeWidth={2.5} />
                </span>
              </div>
            )}
          </div>`;
content = content.replace(targetSubtitle, replaceSubtitle);

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully added buttons!");
