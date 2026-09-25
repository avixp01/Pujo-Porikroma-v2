const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

const regex = /<div className="preview-actions">[\s\S]*?\{poorAccuracy && \(/;

const newBlock = `<div className="preview-actions">
            <button className="btn-navigate" style={{ flex: (!selectedLocation || !['Toilets', 'Metro', 'Train'].includes(selectedLocation.category)) ? undefined : 1 }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
              </svg>
              Navigate
            </button>
            {(!selectedLocation || !['Toilets', 'Metro', 'Train'].includes(selectedLocation.category)) && (
              <button className="btn-route">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Route
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Poor GPS Warning */}
      {poorAccuracy && (`;

code = code.replace(regex, newBlock);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Successfully fixed preview-actions block");
