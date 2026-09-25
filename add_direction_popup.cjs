const fs = require('fs');

let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Add state for popup
if (!code.includes('isDirectionPopupOpen')) {
    code = code.replace(/const \[isDarkMode, setIsDarkMode\] = useState\(false\);/, "const [isDarkMode, setIsDarkMode] = useState(false);\n  const [isDirectionPopupOpen, setIsDirectionPopupOpen] = useState(false);");
}

// 2. Add onClick to arrow button
code = code.replace(/<button className="map-action-btn">[\s\n]*<svg viewBox="0 0 24 24" width="22" height="22"/, `<button className="map-action-btn" onClick={() => setIsDirectionPopupOpen(true)}>\n            <svg viewBox="0 0 24 24" width="22" height="22"`);

// 3. Add lucide imports
code = code.replace(/Mic, Sun, Moon \} from 'lucide-react';/, "Mic, Sun, Moon, Car, Bike, Train, Footprints, Home, Clock, ArrowUpDown } from 'lucide-react';");

// 4. Add the popup UI right before the final closing div
const popupUI = `
      {/* Direction Popup Overlay */}
      {isDirectionPopupOpen && (
        <div className={\`direction-popup-wrapper \${isDarkMode ? 'dark-mode' : ''}\`}>
          {/* Header */}
          <div className="direction-header">
            <div className="direction-top-row">
              <button className="direction-back-btn" onClick={() => setIsDirectionPopupOpen(false)}>
                <ArrowLeft size={24} />
              </button>
              <div className="direction-inputs-container">
                <div className="direction-input-group">
                  <div className="direction-dots">
                    <div className="dot-start" />
                    <div className="dot-line" />
                    <div className="dot-end" />
                  </div>
                  <div className="direction-input-fields">
                    <input type="text" className="direction-input" placeholder="Your location" defaultValue="Your location" />
                    <input type="text" className="direction-input" placeholder="Choose destination" />
                  </div>
                </div>
                <button className="direction-swap-btn">
                  <ArrowUpDown size={20} />
                </button>
              </div>
            </div>
            
            <div className="direction-modes">
              <button className="mode-btn"><Car size={24} /></button>
              <button className="mode-btn"><Bike size={24} /></button>
              <button className="mode-btn"><Train size={24} /></button>
              <button className="mode-btn active"><Footprints size={24} /></button>
            </div>
          </div>
          
          {/* List */}
          <div className="direction-list">
            <div className="direction-list-item">
              <div className="item-icon home"><Home size={20} /></div>
              <div className="item-content">
                <div className="item-title">Home</div>
                <div className="item-subtitle">Ichapur, Kolkata, West Bengal</div>
              </div>
            </div>
            
            <div className="direction-list-item">
              <div className="item-icon"><Clock size={20} /></div>
              <div className="item-content border-b">
                <div className="item-title">Malda</div>
                <div className="item-subtitle">West Bengal</div>
              </div>
            </div>
            
            <div className="direction-list-item">
              <div className="item-icon"><Clock size={20} /></div>
              <div className="item-content border-b">
                <div className="item-title">Chandni Chowk</div>
                <div className="item-subtitle">Chittaranjan Avenue, Chandni Chawk, Bowbazar...</div>
              </div>
            </div>
            
            <div className="direction-list-item">
              <div className="item-icon"><Clock size={20} /></div>
              <div className="item-content border-b">
                <div className="item-title">Acro Engineering Company</div>
                <div className="item-subtitle">Srinath Das Lane, Chandni Chawk, Bowbazar, K...</div>
              </div>
            </div>
            
            <div className="direction-list-item">
              <div className="item-icon"><Clock size={20} /></div>
              <div className="item-content border-b">
                <div className="item-title">Metro Station</div>
                <div className="item-subtitle">West Bengal</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>`;

code = code.replace(/<\/div>\s*\)\;\s*\}\;\s*export default MapPage;/, popupUI + '\n  );\n};\n\nexport default MapPage;');

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Replaced JS successfully");
