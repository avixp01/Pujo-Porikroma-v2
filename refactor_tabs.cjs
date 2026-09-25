const fs = require('fs');
let code = fs.readFileSync('src/components/MapPage.jsx', 'utf8');

// 1. Wrap direction-modes with !navigationDestination
const oldModes = `<div className="direction-modes">
              <button className={\`mode-btn \${activeDirectionMode === 'car' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('car')}><img src="/pandel-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="pandal mode" /></button>
              <button className={\`mode-btn \${activeDirectionMode === 'bike' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('bike')}><img src="/toilet-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="toilet mode" /></button>
              <button className={\`mode-btn \${activeDirectionMode === 'train' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('train')}><img src="/metro-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="metro mode" /></button>
              <button className={\`mode-btn \${activeDirectionMode === 'footprints' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('footprints')}><img src="/train-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="train mode" /></button>
            </div>`;

const regexModes = /<div className="direction-modes">[\s\S]*?<\/div>/;

const newModes = `{!navigationDestination && (
              <div className="direction-modes">
                <button className={\`mode-btn \${activeDirectionMode === 'car' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('car')}><img src="/pandel-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="pandal mode" /></button>
                <button className={\`mode-btn \${activeDirectionMode === 'bike' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('bike')}><img src="/toilet-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="toilet mode" /></button>
                <button className={\`mode-btn \${activeDirectionMode === 'train' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('train')}><img src="/metro-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="metro mode" /></button>
                <button className={\`mode-btn \${activeDirectionMode === 'footprints' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('footprints')}><img src="/train-icon.png" style={{ width: "auto", height: "20px", objectFit: "contain", filter: isDarkMode ? "invert(1)" : "none" }} alt="train mode" /></button>
              </div>
            )}`;
code = code.replace(regexModes, newModes);

// 2. Insert bottom tabs into navigation-details-panel
const oldPanelStart = `<div className="navigation-details-panel">`;
const newPanelStart = `<div className="navigation-details-panel">
                <div className="nav-bottom-tabs" style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', padding: '8px 16px', gap: '24px' }}>
                  <button className={\`nav-tab-btn \${activeDirectionMode === 'footprints' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('footprints')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'footprints' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'footprints' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <Footprints size={24} />
                  </button>
                  <button className={\`nav-tab-btn \${activeDirectionMode === 'train' ? 'active' : ''}\`} onClick={() => setActiveDirectionMode('train')} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '12px', border: 'none', background: 'transparent', color: activeDirectionMode === 'train' ? '#3b82f6' : '#9ca3af', borderBottom: activeDirectionMode === 'train' ? '3px solid #3b82f6' : '3px solid transparent', cursor: 'pointer' }}>
                    <Train size={24} />
                  </button>
                </div>`;
code = code.replace(oldPanelStart, newPanelStart);

fs.writeFileSync('src/components/MapPage.jsx', code, 'utf8');
console.log("Refactored UI for 2 bottom tabs");
